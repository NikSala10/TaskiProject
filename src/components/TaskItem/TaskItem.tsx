import { useState } from "react";
import type { TaskItemProps } from "../../types/TasksType";

const TaskItem = ({ task }: TaskItemProps) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleToggleComplete = () => {
    setIsCompleted((prevState) => !prevState);
  };

  const getPriorityColor = (priority: 'Low' | 'Medium' | 'High') => {
    switch (priority) {
      case 'High':
        return '#82C2F6'; 
      case 'Medium':
        return '#DBB6FF'; 
      case 'Low':
        return '#FF935A'; 
      default:
        return '#A89EC9';
    }
  };

  const renderButton = () => {
    if (task.isAdditional) {
      // Botón de "Aceptar" para tareas adicionales
      return (
        <button
          className="accept-btn"
          onClick={handleToggleComplete}
        >
          Aceptar
        </button>
      );
    } else {
      // Botón de "Check" para tareas normales
      return (
        <button
          className={`complete-btn ${isCompleted ? "completed" : ""}`}
          onClick={handleToggleComplete}
        >
          {isCompleted ? "✓" : ""}
        </button>
      );
    }
  };
  
  return (
    <div className={`task-item ${isCompleted ? "completed" : ""}`}>
        <h3>{task.name}</h3>
        <div className="task-info">
          <div className="text-info">
            <span className="priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
              {task.priority}
            </span>
            <p>{task.points} Points</p>
            <p>{task.time}</p>
          </div>
          <div>
            <button
              className={`complete-btn ${isCompleted ? "completed" : ""}`}
              onClick={handleToggleComplete}>
              {isCompleted ? "✓" : ""}
            </button>
        </div>
          </div>
          
    </div>
  );
};

export default TaskItem;
