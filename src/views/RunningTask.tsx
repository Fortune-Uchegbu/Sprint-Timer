import { useHotSeat } from "../hooks";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ensureContext } from "../utils";

const RunningTask = () => {
  const appContext = ensureContext(useContext(AppContext), 'running task');
  const { activeTask } = appContext;
  const hotSeat = useHotSeat(activeTask);
  // console.log(hotSeat.timeLeft, hotSeat.minsLeft, hotSeat.secsLeft)
  const runOptions = () => {
    // pause, resume, skip, end task
  }
  return (
    <div>
      <p 
      className="activeTask text-9xl font-bold text-red-900">
        {`${hotSeat.minsLeft} : ${hotSeat.secsLeft}`}
      </p>
      {/* <p>{hotSeat?.title}</p>
      <p>{hotSeat?.description}</p> */}
      <button onClick={runOptions}>Pause</button>
      
    </div>

  )
}

export default RunningTask;