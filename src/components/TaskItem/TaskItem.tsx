import { useState } from "react";
import type { Task, TaskItemProps } from "../../types/TasksType";
import { useDispatch, useSelector } from "react-redux";
import { deleteDoc, doc, getDoc, increment, setDoc, updateDoc } from "firebase/firestore";
import { deleteTask, setTasks } from "../../redux/slices/tasksSlice";
import { db } from "../../services/firebaseConfig";
import type { RootState } from "../../redux/store";
import { addPoints } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";

const TaskItem = ({ task, setActiveTab }: TaskItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); 
  const userID = useSelector((state: RootState) => state.auth.userID);
  const userName = useSelector((state: RootState) => state.auth.username);

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

  // Función para eliminar tarea
  const handleDeleteTask = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    const taskRef = doc(db, "tasks", task.id);
    await deleteDoc(taskRef); // ✅ Borra de Firebase

    dispatch(deleteTask(task.id)); // ✅ Borra de Redux
  };

  // Función para redirigir a editar tarea
  const handleEditTask = () => {
    navigate(`/edit-task/${task.id}`);
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
      if (task.creatorId === userID) {
      return null;
    }

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
      <div className="actions-tasks-edi-elim">
        <h3>{task.title}</h3>
        {task.creatorId === userID && (  
          <div className="sub-colum-actions">
            <div className="eliminar-task" onClick={handleDeleteTask} style={{cursor: "pointer"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#5b5b5b77" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2zM18 4h-2.5l-.71-.71c-.18-.18-.44-.29-.7-.29H9.91c-.26 0-.52.11-.7.29L8.5 4H6c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1"/>
              </svg>
            </div>
            <div className="edit-task" onClick={handleEditTask} style={{cursor: "pointer"}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="#ffffffc3" d="M18.925 3.137a3.027 3.027 0 0 0-4.283.001l-9.507 9.52a3.03 3.03 0 0 0-.885 2.139V18c0 .414.336.75.75.75h3.223c.803 0 1.573-.32 2.14-.887l9.5-9.506a3.03 3.03 0 0 0 0-4.28zM4 20.25a.75.75 0 0 0 0 1.5h16a.75.75 0 0 0 0-1.5z"/>
              </svg>
            </div>
          </div>
        )}
      </div>
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
