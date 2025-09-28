import type { TaskListProps } from "../../types/TasksType"; 
import TaskItem from "../TaskItem/TaskItem";

const TasksList = ({ tasks }: TaskListProps) => {
  return (
    <div className="tasks-list" style={{ display: "flex", gap: "20px" }}>
      <div className="tasks-column">
        {tasks.slice(0, 4).map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
      
      <div className="tasks-column">
        {tasks.slice(4).map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TasksList;
