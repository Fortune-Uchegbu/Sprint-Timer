import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext} from "../context/AppContext";
import { ensureContext } from "../utils/";

const TaskDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    if (!id) {
      navigate('/tasks')
      return null
    }
    const contextData = ensureContext(useContext(AppContext), 'task');
    const { tasks, setCurrentTaskId } = contextData;
    const task = tasks.find((t) => t.id === id);
    if (!task) {
      navigate ('/tasks');
      return null;
    }
    const runTask = () => {
      setCurrentTaskId(id);
      navigate('/runningTask');
    };
    const btnText = () => {
      const status = task.status;
      const text = (status === 'pending') ? 'Start' :
      (status === 'running') ? 'Pause' :
      (status === 'paused') ? 'Resume' :
      (status === 'completed') ? 'Completed': null;
      return text;
    }

  return (
    <article>
      {task ? (
        <>
          <h2>Title: {task.title}</h2>
          <p>Description: {task.description}</p>

          <section>
            <p>Category: {task.category}</p>
            <p>Priority: {task.priority}</p>
            <p>Duration: {(task.duration)/60} minutes</p>
            <p>Due Date: {task.dueDate}</p>
            <p>Status: {task.status}</p>
          </section>
 
          <button 
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
          onClick={runTask}>
            {`${btnText()} task`}
          </button>

          {}
        </>
      ) : (
        <>Task not found</>
      )}
    </article>
  )
}

export default TaskDetails;