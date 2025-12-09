import type { Task } from './utils/types';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';  
import { RunningTask, TaskInput, TaskList } from './views';

function Main() {
  type AppState = {
    task: Task[],
    currentTaskId: string | null
  }
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

  return (
    <Routes>
        <Route path = '/' element = {<TaskList />} />
        <Route path = '/addTask' element = {<TaskInput />} />
        <Route path = '/runningTask' element = {<RunningTask />} />
    </Routes>
  )
}

export default Main;