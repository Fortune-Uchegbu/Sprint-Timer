import {  type timerData, ensureContext } from '../utils';
import { useState, useEffect, useRef, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export const useHotSeat = (taskId: string | undefined) => {
    const { tasks } = ensureContext(useContext(AppContext), 'tasks');
    const task = tasks.find((t) => t.id === taskId)
    const initialTime = task?.duration ? (task.duration) : 0
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
        const remainingTime  = timeLeft;
        clearInterval(countDownId);
        // update obj remaining key
        const newTaskObj = {...task, remaining: remainingTime}
        console.log(newTaskObj)
    }
    const stopTask = () => {
        // clear interval
        // update obj remaining key back to duration
    }
    const resumeTask = () => {
        // if obj status is on paused:
        // get remaining and set as initialtime
        // start timer
    }

    return {hotSeat, pauseTask, stopTask, resumeTask};
}