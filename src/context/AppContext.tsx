import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Task, AppContextType} from '../utils'
import { formatTimeLeft } from '../utils';

// Get data from local storage at load time
const loadData = <T,>(storageTitle: string, defaultData: T[]) : T[] => {
    const storedData = localStorage.getItem(storageTitle);
    if (!storedData) {
        localStorage.setItem(storageTitle, JSON.stringify(defaultData)); // Initialize if not present
        return defaultData;
    } else {
        try {
            return JSON.parse(storedData) as T[];
        } catch (error) {
            console.error(`Error parsing ${storageTitle} from localStorage:`, error);
            return [];
        }
    }
}


export const AppContext = createContext<AppContextType | undefined >(undefined)
export const AppProvider = ({ children } : { children: ReactNode }) => {
    const [now, setNow] = useState<Date>(new Date());
    const [tasks, setTasks] = useState<Task[]>(loadData<Task>('tasks', []));
    const [currentTaskId, setCurrentTaskId] = useState<string | undefined>(undefined);
    const [taskCategories, setTaskCategories] = useState<string[]>(loadData<string>('taskCategories', ['other', 'work', 'school', 'personal', 'health']));

    // effect to manage now date object
    useEffect(() => {
        const interval = setInterval(() => {setNow(new Date())}, 1000 * 60 * 60); // Update every hour
        return () => clearInterval(interval);
    }, [])


    const addTask = ({title, description, category, priority, duration, dueDate }: Task): boolean => {
        const idNumber = crypto.randomUUID();
        const timeLeft = formatTimeLeft(now, dueDate)

        const newTask: Task = {
            id: idNumber,
            title: title,
            description: description,
            category: category,
            priority: priority,
            dueDate: timeLeft.text,
            dueDateBg: timeLeft.bg,
            duration: duration,
            remaining: duration,
            status: "pending" as const,
            reminder: null,
            createdAt: new Date().toISOString(),
            updatedAt: null,
        }
        const payload = {
            storageTitle: 'tasks',
            newData: newTask,
            stateSetter: setTasks
        }
        const success = update(payload);
        
        return success;
    }
    // helper function to update state and local storage
    const update = <T,>({
        storageTitle,
        newData,
        stateSetter
        }:{
            storageTitle: string,
            newData: T,
            stateSetter: React.Dispatch<React.SetStateAction<T[]>>
        }) : boolean => {
        try {
            stateSetter(prev => {
                const updatedTasks = [...prev, newData];
                localStorage.setItem(storageTitle, JSON.stringify(updatedTasks));
                return updatedTasks;
            }); 
            return true;
        } catch (error) {
            console.error(`Error saving ${storageTitle} to localStorage:`, error);
            return false;
        }
    }

    return (
        <AppContext.Provider 
        value = {{
            tasks,
            currentTaskId,
            setTasks,
            setCurrentTaskId,
            addTask, update,
            taskCategories,
            setTaskCategories,
        }} >
            {children}
        </AppContext.Provider>
    )
}