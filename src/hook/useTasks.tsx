import { useEffect } from "react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { setTasks } from "../redux/slices/tasksSlice";
import type { Task } from "../types/TasksType";
import { useDispatch } from "react-redux";

export const useTasks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const q = query(collection(db, "tasks"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allTasks: Task[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Task, "id" | "isAdditional">;

        return {
          id: doc.id,
          ...data,
          isAdditional: !data.assigneeId, 
        };
      });

      dispatch(setTasks(allTasks)); // ✅ Enviar TODAS las tareas al redux
    });

    return () => unsubscribe();
  }, [dispatch]);
};
