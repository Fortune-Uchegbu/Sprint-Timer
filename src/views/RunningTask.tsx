import { useHotSeat } from "../hooks";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ensureContext } from "../utils";

const RunningTask = () => {
  const { currentTaskId } = ensureContext(useContext(AppContext), 'running task id');
  const data = useHotSeat(currentTaskId);
  const {hotSeat, pauseTask, stopTask, resumeTask} = data
  
  return (
    <div>
      <p 
      className="activeTask text-9xl font-bold text-red-900">
        {`${hotSeat.minsLeft} : ${hotSeat.secsLeft}`}
      </p>
      {/* <p>{hotSeat?.title}</p>
      <p>{hotSeat?.description}</p> */}
      <button className="p-6 bg-blue-950 text-white rounded-sm mr-5" onClick={pauseTask}>Pause</button>
      <button className="p-6 bg-blue-950 text-white rounded-sm" onClick={stopTask}>Stop</button>
      
    </div>

  )
}

export default RunningTask;