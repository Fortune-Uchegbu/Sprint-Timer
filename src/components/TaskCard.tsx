import { Link } from 'react-router-dom'
import type { Task } from '../utils/types'
type taskCardType = {task: Task}

const TaskCard = ({task}: taskCardType) => {
  return (
    <Link to= {`/task/${task.id}`} className="flex flex-col gap-y-2 rounded-xl bg-gray-500 p-3 ">
       <div className="flex justify-between items-center">
        <span className={`py-1 px-2 rounded-full text-sm font-semibold ${task.dueDateBg}`}>{task.dueDate}</span>
        <div className="flex gap-x-1">
          <span className="bg-green-300 rounded-full py-1 px-2 font-semibold text-sm">{task.category}</span>
          <span className="bg-purple-300 rounded-full py-1 px-2 font-semibold text-sm">{task.priority}</span>
          <span className="bg-red-300 rounded-full py-1 px-2 font-semibold text-sm">{task.status}</span>
        </div>
       </div>
      <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-600">{task.description}</p>
    </Link>
  )
}

export default TaskCard