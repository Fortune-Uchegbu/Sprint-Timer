import React, { useState, useContext } from 'react';
import { appContext } from '../context/AppContext';
import { ensureContext } from '../utils/handleEror';

const TaskInputPage = () => {
  const context = ensureContext(useContext(appContext), 'TaskInputPage');
  const { addTask } = context;

  //catergories
  const [taskCategories, setTaskCategories] = useState(['Other', 'Work', 'School', 'Personal', 'Health',]);
  const [selectedCategory, setSelectedCategory] = useState(taskCategories[0]);
  const [catIsOpen, setCatIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  

  // helper functions
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get('title') as string;
    const duration = Number(data.get('duration'));
    const success = addTask({title, duration});
    if (success) {e.currentTarget.reset()} // Reset form only if addTask was successful
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
    const cat = data.get('addCategory') as string;
    console.log(cat)
    setTaskCategories(prev => [...prev, cat]);
    setCategory(cat);
    setModalIsOpen(false);
  }

  return (
    <div className="relative">

      <form 
      className='h-screen w-full flex flex-col'
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