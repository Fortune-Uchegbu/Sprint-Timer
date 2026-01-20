import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Task, newTaskInput, AppContextType} from '../utils'
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
    const [currentTaskId, setCurrentTaskId] = useState<string | null>(null);
    const [taskCategories, setTaskCategories] = useState<string[]>(loadData<string>('taskCategories', ['other', 'work', 'school', 'personal', 'health']));

    // effect to manage now date object
    useEffect(() => {
        const interval = setInterval(() => {setNow(new Date())}, 1000 * 60 * 60); // Update every hour
        return () => clearInterval(interval);
    }, [])

    const addTask = ({title, description, category, priority, duration, dueDate }: newTaskInput): boolean => {
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
        const success = updateStore(payload);
        
        return success;
    }
    // helper function to update state and local storage
    const updateStore = <T,>({
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
    // helper function to update tasklist elements without loosing position
    const updateTasklist = (newTaskObj: Task ) => {
        setTasks(prev => {
            const newTaskList = prev.map(task => (task.id === newTaskObj.id) ? newTaskObj : task);
            localStorage.setItem('tasks', JSON.stringify(newTaskList) )
            return newTaskList;
        });
    }

    return (
        <AppContext.Provider 
        value = {{
            tasks,
            currentTaskId,
            setTasks,
            setCurrentTaskId,
            addTask, updateStore, updateTasklist,
            taskCategories,
            setTaskCategories,
        }} >
            {children}
        </AppContext.Provider>
    )
}