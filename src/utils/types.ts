export type Task = {
    id: string;             
    title: string;         
    duration: number;        
    remaining: number;     
    status: "pending" | "running" | "paused" | "completed";
    reminder?: number;       // optional time before completion to trigger alarm
    createdAt: Date;
    updatedAt: Date;
}

