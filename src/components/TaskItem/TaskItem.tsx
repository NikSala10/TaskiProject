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
        return '#5E87A3';  // Azul
      case 'Medium':
        return '#A89EC9';  // Morado
      case 'Low':
        return '#F28C82';  // Naranja
      default:
        return '#A89EC9';
    }
  };

  return (
    <div className={`task-item ${isCompleted ? "completed" : ""}`}>
      <div className="task-info">
        {/* Mostramos el nombre de la tarea */}
        <h3>{task.name}</h3>
        {/* Mostramos la prioridad con un color específico */}
        <span className="priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {task.priority}
        </span>
      </div>
      <div className="task-details">
        <p>{task.points} Points</p>
        <p>{task.time}</p>
      </div>

      {/* Botón para marcar como completada */}
      <button
        className={`complete-btn ${isCompleted ? "completed" : ""}`}
        onClick={handleToggleComplete}
      >
        {isCompleted ? "✓" : "○"}
      </button>
    </div>
  );
};

export default TaskItem;
