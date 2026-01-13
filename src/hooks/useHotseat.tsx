import type { Task, timerData } from '../utils/types';
import { useState, useEffect, useRef } from 'react';

export const useHotSeat = (task: Task | null) => {
    const initialTime = task?.duration ? (task.duration) * 60 : 0
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);
    const timerData = useRef<timerData>({
        minsLeft: Math.floor(initialTime / 60),
        secsLeft: initialTime % 60
    });

    const minsLeft = timerData.current.minsLeft;
    const secsLeft = timerData.current.secsLeft

    useEffect(() => {          
        const countDown = setInterval(() => {
            setTimeLeft(prev => {
                const newTimeLeft = Math.max(prev - 1, 0);
                timerData.current.minsLeft = Math.floor(newTimeLeft / 60);
                timerData.current.secsLeft = newTimeLeft % 60;
                return newTimeLeft
            })
        }, 1000)
        return () => clearInterval(countDown);
        
    }, [timeLeft]);
    

    return {
        timeLeft: timeLeft,
        minsLeft: String(minsLeft).padStart(2, '0'),
        secsLeft: String(secsLeft).padStart(2, '0')
    };
}
