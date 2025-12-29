import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Task, AppContextType } from '../utils/types'

// Get data from local storage at load time
const loadTasks = () : Task[] => {
    const storedTasks = localStorage.getItem('tasks');
    if (!storedTasks) {
        localStorage.setItem('tasks', JSON.stringify([])); // Initialize if not present
        return [];
    }
    try {
        return JSON.parse(storedTasks) as Task[];
    } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        return [];
    }
}

// Helper function to get current ISO timestamp
const now = () => new Date().toISOString()


export const appContext = createContext<AppContextType | undefined >(undefined)
export const AppProvider = ({ children } : { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>(loadTasks());
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);

    const addTask = ({title, duration}: {title: string, duration: number}): boolean => {
        const idNumber = crypto.randomUUID();
        const newTask: Task = {
            id: idNumber,
            title: title,
            duration: duration,
            remaining: duration,
            status: "pending" as const,
            reminder: null,
            createdAt: now(),
            updatedAt: null,
        }
        
        // Update state and local storage
        const success = (() => {
            try {
                setTasks(prev => {
                    const updatedTasks = [...prev, newTask];
                    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                    return updatedTasks;
                }); 
                return true;
            } catch (error) {
                console.error('Error saving tasks to localStorage:', error);
                return false;
            }
        })()
        return success;
    }

    return (
        <appContext.Provider value = {{tasks, currentTaskId, setTasks, setCurrentTaskId, addTask}} >
            {children}
        </appContext.Provider>
    )
}