import type { TaskListProps } from "../../types/TasksType"; 
import TaskItem from "../TaskItem/TaskItem";

const TasksList = ({ tasks, setActiveTab }: TaskListProps) => {
  return (
    <div className="tasks-list">
      <div className="tasks-column">
        {tasks.slice(0, 4).map((task) => (
          <TaskItem key={task.id} task={task} setActiveTab={setActiveTab}/>
        ))}
      </div>

      <div className="tasks-column">
        {tasks.slice(4).map((task) => (
          <TaskItem key={task.id} task={task} setActiveTab={setActiveTab}/>
        ))}
      </div>
    </div>
  );
};

export default TasksList;