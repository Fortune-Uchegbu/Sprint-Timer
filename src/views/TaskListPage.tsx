import { useContext } from "react";
import { appContext } from "../context/AppContext";
import { ensureContext } from "../utils/handleEror";  
import { TaskCard } from "../components";
// type taskListTypes = {
//     tasks: Task[],
//     currentTaskId: string | null
// }
const TaskListPage = () => {
    const context = ensureContext(useContext(appContext), 'TaskList');
    const { tasks, currentTaskId } = context;
    return (
        <>
        <header className="text-3xl py-5">
            Tasks
        </header>
        <main>
            {tasks.map((task, key) => (
                <TaskCard 
                key={key}
                task = {task} />
            ) )}
        </main>
        </>
        
    )
}

export default TaskListPage