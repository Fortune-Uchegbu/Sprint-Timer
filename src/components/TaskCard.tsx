import type { Task } from '../utils/types'
type taskCardType = {task: Task}

const TaskCard = ({task}: taskCardType) => {
  return (
    <div>{task.title}</div>
  )
}

export default TaskCard