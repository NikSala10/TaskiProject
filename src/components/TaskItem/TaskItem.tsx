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
        return '#ffffffff'; 
      case 'Low':
        return '#FF935A'; 
      default:
        return '#A89EC9';
    }
  };

  return (
    <div className={`task-item ${isCompleted ? "completed" : ""}`}>
      <div className="task-info">
        <h3>{task.name}</h3>
        <span className="priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {task.priority}
        </span>
      </div>
      <div className="task-details">
        <p>{task.points} Points</p>
        <p>{task.time}</p>
      </div>

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
