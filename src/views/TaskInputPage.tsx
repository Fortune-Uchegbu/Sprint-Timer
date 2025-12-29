import React, { useState, useContext } from 'react';
import { appContext } from '../context/AppContext';
import { ensureContext } from '../utils/handleEror';

const TaskInputPage = () => {
  const [duration, setDuration] = useState(null)
  const context = ensureContext(useContext(appContext), 'TaskInputPage');
  const { addTask } = context;
  // const [durationType, setDurationType] = 

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const title = data.get('title') as string;
    const duration = Number(data.get('duration'));
    const success = addTask({title, duration});
    if (success) {e.currentTarget.reset()} // Reset form only if addTask was successful
  }

  return (
    <form 
    className='h-screen w-full flex flex-col'
    onSubmit = {handleSubmit}>
      <label htmlFor="taskTitle">Title:</label>
      <input className='p-2' type="text" name="title" id="taskTitle" required/>
      <label htmlFor="duration">Duration:</label>
      <input className='p-2' type="number" name="duration" id="duration" required min={1}/>
      <input type="submit" value="Add Task" />
      {/* <fieldset> 
        <input className='p-2' type="number" name="duration" id="textDuration" />
        <input type="button" value="25" />
        <input type="button" value="50" />
      </fieldset> */}
      
    </form>
  )
}

export default TaskInputPage 