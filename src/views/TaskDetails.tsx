import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext} from "../context/AppContext";
import { ensureContext } from "../utils/handleEror";
import type { Task } from "../utils";

const TaskDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const appContext = useContext(AppContext);
    const contextData = ensureContext(appContext, 'task');
    const { tasks, setCurrentTaskId } = contextData;
    const task = tasks.find((t) => t.id === id);
    const runTask = () => {
      setCurrentTaskId(id);
      navigate('/runningTask');
    };

  return (
    <article>
      {task ? (
        <>
          <h2>Title: {task.title}</h2>
          <p>Description: {task.description}</p>

          <section>
            <p>Category: {task.category}</p>
            <p>Priority: {task.priority}</p>
            <p>Duration: {task.duration} minutes</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
          </section>
 
          <button 
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={() => runTask}>
            Start task
          </button>
        </>
      ) : (
        <>Task not found</>
      )}
    </article>
  )
}

export default TaskDetails;