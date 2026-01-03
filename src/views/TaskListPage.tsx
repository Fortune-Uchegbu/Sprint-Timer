import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ensureContext } from "../utils/handleEror";  
import { TaskCard } from "../components";
// type taskListTypes = {
//     tasks: Task[],
//     currentTaskId: string | null
// }
const TaskListPage = () => {
    const context = ensureContext(useContext(AppContext), 'TaskList');
    const { tasks, currentTaskId } = context;
    return (
        <>
        <header>
            <h1 className="text-3xl py-5">Tasks</h1>
        </header>
        <main className="flex flex-col gap-y-2 px-2">
            {tasks.map((task, key) => (
                <TaskCard 
                key={key}
                task = {task} />
            ))}
        </main>

        </>
        
    )
}

export default TaskListPage