import type { Task } from './utils/types';
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';  
import { RunningTask, TaskInput, TaskList, TaskDetails } from './views';

function Main() {
  type AppState = {
    task: Task[],
    currentTaskId: string | null
  }
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  return (
    <Routes>
      <Route path= '/' element = {<Navigate to="/tasks" />} />
      <Route path = '/tasks' element = {<TaskList />} />
      <Route path = '/addTask' element = {<TaskInput />} />
      <Route path = '/runningTask' element = {<RunningTask />} />
      <Route path = '/task/:id' element = {<TaskDetails />} />
    </Routes>
  )
}

export default Main;