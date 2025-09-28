import type { TaskProps } from "../../types/TasksType";

const TaskItem = ({task}: TaskProps) => {
  return (
    <div className="task-item">
        <h3>{task.name}</h3>
        <p>Points: {task.points}</p>
        <p>Time: {task.time}</p>
        <p>Priority: {task.priority}</p>
    </div>
  );
};

export default TaskItem;