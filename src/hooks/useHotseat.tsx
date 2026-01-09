import type { Task } from '../utils/types';
import { useState, useEffect } from 'react';

export const useHotSeat = (task: Task | null) => {
   const initialTime = task?.duration ? (task.duration) * 60 : 0
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    
    useEffect(() => {          
        const countDown = setInterval(() => {
            setTimeLeft(prev => {
                const newTimeLeft = Math.max(prev - 1, 0);
                return newTimeLeft
            })
        }, 1000)

        return () => clearInterval(countDown);
        
    }, [timeLeft]);

    const minsLeft = Math.floor(initialTime / 60);
    const secsLeft = initialTime % 60

    // const updatedTask: Task = {
    //     ...task, 

    //     remaining: undefined,
    //     status: undefined,
    //     reminder: task.reminder,
    //     updatedAt: Date.now().toString()
    // };
    return {
        timeLeft: timeLeft,
        minsLeft: minsLeft,
        secsLeft: secsLeft
    };
}
