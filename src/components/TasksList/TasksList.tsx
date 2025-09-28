import type { TaskListProps } from "../../types/TasksType";
import TaskItem from "../TaskItem/TaskItem";

const TasksList = ({tasks}: TaskListProps) => {
  return (
    <div className="tasks-list">
        {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TasksList;