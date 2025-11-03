import { useState } from "react";
import type { Task, TaskItemProps } from "../../types/TasksType";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { setTasks } from "../../redux/slices/tasksSlice";
import { db } from "../../services/firebaseConfig";
import type { RootState } from "../../redux/store";
import { addPoints } from "../../redux/slices/authSlice";

const TaskItem = ({ task, setActiveTab }: TaskItemProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); 
  const userID = useSelector((state: RootState) => state.auth.userID);
  const userName = useSelector((state: RootState) => state.auth.username);
  console.log("usuario registrado", userName);

  const [isCompleted, setIsCompleted] = useState(task.status === "completed");
  const [isAccepted, setIsAccepted] = useState(!task.isAdditional);

  const handleToggleComplete = async () => {
    const newStatus = !isCompleted;
    setIsCompleted(newStatus);

    // Actualizar estado de la tarea en Firestore
    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, { status: newStatus ? "completed" : "pending" });

    // Si la tarea se completa, sumar puntos al usuario
    const userRef = doc(db, "users", userID);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, { username: userName, numPoints: 0 });
    }

  // Actualizar puntos en Firestore
  await updateDoc(userRef, { numPoints: increment(newStatus ? task.points : -task.points) });

    // Actualizar Redux localmente
    const updatedTasks: Task[] = tasks.map((t) =>
      t.id === task.id ? { ...t, status: newStatus ? "completed" : "pending" } : t
    );
    dispatch(setTasks(updatedTasks));
    dispatch(setTasks(updatedTasks));

  // Actualizar Redux: puntos
  dispatch(addPoints(newStatus ? task.points : -task.points));
  };

  const handleAcceptTask = async () => {
    if (!userID) return; // evitar errores si userID no está definido
    setIsAccepted(true);

    const taskRef = doc(db, "tasks", task.id);
    await updateDoc(taskRef, { 
      isAdditional: false,
      status: "pending",
      assigneeId: userID,
      assigneeName: userName,
    });

    const updatedTasks: Task[] = tasks.map((t) =>
      t.id === task.id
        ? { ...t, isAdditional: false, status: "pending", assigneeId: userID, assigneeName: userName }
        : t
    );

    dispatch(setTasks(updatedTasks));

    setActiveTab?.("my"); // cambiar a pestaña My Tasks si se pasa setActiveTab
  };


  const formatSchedule = (schedule?: string | null): string => {
    if (!schedule) return "No date set"; // fallback
    const date = new Date(schedule);
    if (isNaN(date.getTime())) return "Invalid date"; // fallback si no es fecha válida
    return date.toLocaleString("en-US", {
      weekday: "short",   // ej: Sun
      month: "short",     // ej: Nov
      day: "numeric",     // ej: 2
      hour: "2-digit",    // ej: 02 PM
      minute: "2-digit", 
    });
  };


  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return '#82C2F6'; 
      case 'medium':
        return '#DBB6FF'; 
      case 'low':
        return '#FF935A'; 
      default:
        return '#A89EC9';
    }
  };

  const renderButton = () => {
    if (task.isAdditional && !isAccepted) {
      return (
        <button
          className="accept-btn" onClick={handleAcceptTask}>Accept</button>
      );
    } else {
      return (
        <button className={`complete-btn ${isCompleted ? "completed" : ""}`} onClick={handleToggleComplete}>{isCompleted ? "✓" : ""}</button>
      );
    }
  };
  
  return (
    <div className={`task-item ${isCompleted ? "completed" : ""}`}>
        <h3>{task.title}</h3>
        <div className="task-info">
          <div className="text-info">
            <span className="priority" style={{ backgroundColor: getPriorityColor(task.priority) }}>
              {task.priority}
            </span>
            <p>{task.points} Points</p>
            <p>{formatSchedule(task.schedule)}</p>
          </div>
          <div>
            <div>{renderButton()}</div>
        </div>
          </div>
          
    </div>
  );
};

export default TaskItem;
