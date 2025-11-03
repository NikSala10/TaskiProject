// src/hooks/useCreateTask.ts
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../redux/slices/tasksSlice";
import { db } from "../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import type { RootState } from "../redux/store";

export const useCreateTask = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.auth.userID);

  const createTask = async (taskData: {
    title: string;
    groupId: string;
    assigneeId?: string | null;
    assigneeName?: string | null;
    creatorId: string,  
    priority: "low" | "medium" | "high";
    schedule?: string;
    isAdditional ?: boolean;
  }) => {
    // puntos según prioridad
    const points =
      taskData.priority === "high"
        ? 80
        : taskData.priority === "medium"
        ? 20
        : 10;

    // si no hay asignado, es “Adicional”
    const status = taskData.assigneeId ? "pending" : "additional";

    try {
      const docRef = await addDoc(collection(db, "tasks"), {
        ...taskData,
        points,
        status,
        createdBy: userID,
      });

      // Guardar en Redux también
      dispatch(
        addTask({
          id: docRef.id,
          ...taskData,
          points,
          status,
        })
      );
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return { createTask };
};
