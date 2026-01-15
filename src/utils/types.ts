export interface Task {
    // User-defined fields
    title: string | undefined; 
    description?: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    duration: number; 
    dueDate?: string;
    
    // Auto-managed fields
    id?: string;             
    remaining?: number;     
    status?: "pending" | "running" | "paused" | "completed";
    dueDateBg?: string;
    reminder?: number | null;       // optional time before completion to trigger alarm
    createdAt?: string;
    updatedAt?: string | null;
}

export interface AppContextType {
    tasks : Task[],
    currentTaskId: string | undefined,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setCurrentTaskId: React.Dispatch<React.SetStateAction<string | undefined>>,
    addTask: ({title, description, category, priority, duration, dueDate }: Task) => boolean,
    updateStore: <T,>({storageTitle, newData, stateSetter}: {storageTitle: string, newData: T, stateSetter: React.Dispatch<React.SetStateAction<T[]>>}) => boolean,
    updateTasklist: (newTaskObj : Task) => void,
    taskCategories: string[],
    setTaskCategories: React.Dispatch<React.SetStateAction<string[]>>
}

export interface timerData {
    minsLeft: number,
    secsLeft: number
}