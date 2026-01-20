import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { ensureContext, type newTaskInput } from '../utils';
import { useNavigate } from 'react-router-dom';


const TaskInputPage = () => {
  const context = ensureContext(useContext(AppContext), 'TaskInputPage');
  const { addTask, updateStore, taskCategories, setTaskCategories } = context;
  const navigate = useNavigate();

  //catergories state
  const [selectedCategory, setSelectedCategory] = useState(taskCategories[0]);
  const [catIsOpen, setCatIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // other states  

  // helper functions
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get('title') as string;
    const duration = Number(data.get('duration')) * 60; //convert to seconds
    const description = data.get('description') as string;
    const category = selectedCategory;
    const priority = data.get('priority') as 'low' | 'medium' | 'high';
    const dueDate = data.get('dueDate') as string;
    const success = addTask({title, description, category, priority, duration, dueDate});
    // Reset form only if addTask was successful
    if (success) {
      e.currentTarget.reset()
      setSelectedCategory(taskCategories[0]);
      navigate('/'); // Redirect to task list after adding task
    } 
  }
  const toggleCategories = (): void => {
    setCatIsOpen(prev => !prev);
  }
  const setCategory = (cat: string): void => {
    setSelectedCategory(cat);
    setCatIsOpen(false);
  }
  const toggleCustomModal = (): void => {
    // To be implemented: function to add custom category
    setModalIsOpen(prev => !prev);
    setCatIsOpen(false);
  }
  const addCategory = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const cat = (data.get('addCategory') as string).toLowerCase().trim();
    
    const param = {
      storageTitle: 'taskCategories',
      newData: cat,
      stateSetter: setTaskCategories
    }
    const success = updateStore(param);
    if (!success) return; // Do not proceed if update failed
    setCategory(cat);
    setModalIsOpen(false);
  }

  return (
    <div className="relative">

      <form 
      className='h-screen w-full flex flex-col gap-y-6'
      onSubmit = {handleSubmit}>
        <label htmlFor="taskTitle">Title:</label>
        <input className='p-2' type="text" name="title" id="taskTitle" required/>

        <label htmlFor="taskDescription">Description (optional):</label>
        <input className='p-2' type="text" name="description" id="taskDescription"/>

        <label id="taskCategory">Category:</label>
        <div 
        className="relative w-full">

          <button 
          type='button' 
          aria-expanded={catIsOpen}
          aria-haspopup='listbox'
          aria-controls='category-list'
          onClick={toggleCategories}>
            {selectedCategory}
          </button>

          {catIsOpen && (
            <ul 
            id='category-list'
            role='listbox'
            aria-labelledby="taskCategory"
            className="w-full">
              {taskCategories.map((cat, id) => (
                <li 
                key={id} 
                role='option'
                aria-selected={selectedCategory === cat}
                className="bg-green-300 w-full" 
                onClick={() => setCategory(cat)}>
                  {cat}
                </li>
              ))}
              <li className="bg-blue-300 w-full" onClick={toggleCustomModal}>Add Category</li>
            </ul>
            
          )}
        </div>

        <label htmlFor="priority">Priority</label>
        <select 
        name="priority" 
        id="priority" 
        defaultValue= "medium"
        className='bg-red-300 w-100' required>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        
        <label htmlFor="dueDate">Due date (optional):</label>
        <input 
        className='p-2'
        type="date" 
        name="dueDate"
        min={new Date().toISOString().split('T')[0]} 
        id="dueDate" />

        <label htmlFor="taskDuration">Duration (in minutes):</label>
        <input className='p-2' type="number" name="duration" id="taskDuration" required min={1}/>

        <input type="submit" value="Add Task" />

        {/* <fieldset> 
          <input className='p-2' type="number" name="duration" id="textDuration" />
          <input type="button" value="25" />
          <input type="button" value="50" />
        </fieldset> */}
        
      </form>

      {modalIsOpen && (
        <div className = "absolute top-1/2 left-1/2 -translate-1/2 bg-red-300 p-4 rounded-2xl">
          <form 
          onSubmit = {addCategory}>
            <label htmlFor="addCategory">Category name:</label>
            <input className='p-2' type="text" name="addCategory" id="addCategory" required/>
            <fieldset className="flex flex-col">
              <input type="submit" value="Add Category"/>
              <input type="button" value="Cancel" onClick={toggleCustomModal} />
            </fieldset>
          </form>
        </div>
      )}
    </div>
  )
}

export default TaskInputPage 