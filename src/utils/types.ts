export type Task = {
    id: string;             
    title: string;         
    duration: number;        
    remaining: number;     
    status: "pending" | "running" | "paused" | "completed";
    reminder?: number | null;       // optional time before completion to trigger alarm
    createdAt: string;
    updatedAt: string | null;
}

export type AppContextType = {
    tasks : Task[],
    currentTaskId: string | null,
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    setCurrentTaskId: React.Dispatch<React.SetStateAction<string | null>>,
    addTask: ({title, duration}: {title: string, duration: number}) => boolean
}
