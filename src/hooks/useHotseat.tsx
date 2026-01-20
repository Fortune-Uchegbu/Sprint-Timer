import { type Task, type timerData, ensureContext } from '../utils';
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

export const useHotSeat = (taskId: string | null) => {
    
    const navigate = useNavigate();
    const { tasks, updateTasklist } = ensureContext(useContext(AppContext), 'tasks');
    const task = tasks.find((t) => t.id === taskId);
    if (!task) {
        navigate ('/tasks');
        return null
    }
    // one time effect to update status
    useEffect(() => {
        console.log('calling hotseat!')
        const newTaskObj:Task = {...task, status: "running" as const}; // update the task's status
        updateTasklist(newTaskObj);
    }, [])
    const initialTime = task.remaining ? (task.remaining) : 0
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const timerData = useRef<timerData>({
        minsLeft: Math.floor(initialTime / 60),
        secsLeft: initialTime % 60
    });
    const minsLeft = timerData.current.minsLeft;
    const secsLeft = timerData.current.secsLeft;
    let countDownId:number;
    useEffect(() => {          
        countDownId = setInterval(() => {
            setTimeLeft(prev => {
                const newTimeLeft = Math.max(prev - 1, 0);
                timerData.current.minsLeft = Math.floor(newTimeLeft / 60);
                timerData.current.secsLeft = newTimeLeft % 60;
                return newTimeLeft
            })
        }, 1000)
        return () => clearInterval(countDownId);
        
    }, [timeLeft]);

    // returning data

    const hotSeat = {
        timeLeft: timeLeft,
        minsLeft: String(minsLeft).padStart(2, '0'),
        secsLeft: String(secsLeft).padStart(2, '0')
    }

    const pauseTask = () => {
        console.log('calling pause task!')
        if (!task) return null
        clearInterval(countDownId);
        const newTaskObj:Task = {
            ...task,
            remaining: timeLeft, 
            status: "paused" as const,
        };
        updateTasklist(newTaskObj);
    }
    const resumeTask = () => {
        console.log('calling resume task!')
        // if obj status is on paused:
        // get remaining and set as initialtime
        // start timer
    }
    const stopTask = () => {
        console.log('calling stop task!')
        clearInterval(countDownId);
        // pop up modal
        setTimeLeft(0);
        const newTaskObj:Task = {...task, remaining: task.duration, status: "pending" as const};
        updateTasklist(newTaskObj);
        navigate('/tasks');
    }

    const btnText = () => {
      const status = task.status;
      const text = (status === 'running') ? 'Pause' :
      (status === 'paused') ? 'Resume' :
      (status === 'completed') ? 'Completed': null;
      return text;
    }

    return {hotSeat, pauseTask, stopTask, resumeTask, btnText};
}