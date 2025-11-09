import type { TaskListProps } from "../../types/TasksType"; 
import TaskItem from "../TaskItem/TaskItem";

const TasksList = ({ tasks, setActiveTab, showEditDelete, singleColumn = false }: TaskListProps & { singleColumn?: boolean }) => {
  if (singleColumn) {
    return (
      <div className="tasks-column">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} setActiveTab={setActiveTab} showEditDelete={showEditDelete} />
        ))}
      </div>
    );
  }

  // modo por defecto (dos columnas)
  const middleIndex = Math.ceil(tasks.length / 2);
  const firstHalf = tasks.slice(0, middleIndex);
  const secondHalf = tasks.slice(middleIndex);

  return (
    <div className="tasks-list">
      <div className="tasks-column">
        {firstHalf.map(task => (
          <TaskItem key={task.id} task={task} setActiveTab={setActiveTab} showEditDelete={showEditDelete} />
        ))}
      </div>
      <div className="tasks-column">
        {secondHalf.map(task => (
          <TaskItem key={task.id} task={task} setActiveTab={setActiveTab} showEditDelete={showEditDelete} />
        ))}
      </div>
    </div>
  );
};
export default TasksList;