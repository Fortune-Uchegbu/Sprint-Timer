export interface Task {
    // User-defined fields
    title: string; 
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
    currentTaskId: string | null,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setCurrentTaskId: React.Dispatch<React.SetStateAction<string | null>>,
    addTask: ({title, description, category, priority, duration, dueDate }: Task) => boolean,
    update: <T,>({storageTitle, newData, stateSetter}: {storageTitle: string, newData: T, stateSetter: React.Dispatch<React.SetStateAction<T[]>>}) => boolean,
    taskCategories: string[],
    setTaskCategories: React.Dispatch<React.SetStateAction<string[]>>
    activeTask: Task | null,
    setActiveTask: React.Dispatch<React.SetStateAction<Task | null>>
}
