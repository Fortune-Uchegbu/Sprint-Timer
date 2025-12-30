export interface Task {
    // User-defined fields
    title: string; 
    description?: string;
    category: string;
    priority: 'low' | 'medium' | 'high';
    duration: number; 
    dueDate?: string | null;
    
    // Auto-managed fields
    id: string;             
    remaining: number;     
    status: "pending" | "running" | "paused" | "completed";
    reminder?: number | null;       // optional time before completion to trigger alarm
    createdAt: string;
    updatedAt: string | null;
}

export interface AppContextType {
    tasks : Task[],
    currentTaskId: string | null,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setCurrentTaskId: React.Dispatch<React.SetStateAction<string | null>>,
    addTask: ({title, duration}: {title: string, duration: number}) => boolean
}
