import type { TaskItemProps} from "../../types/TasksType";

const TaskItem = ({task}: TaskItemProps) => {
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