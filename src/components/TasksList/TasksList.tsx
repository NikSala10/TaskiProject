import type { TaskProps } from "../../types/TasksType";
import TaskItem from "../TaskItem/TaskItem";

const TasksList = ({tasks}: TaskProps) => {
  return (
    <div className="tasks-list">
        {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;