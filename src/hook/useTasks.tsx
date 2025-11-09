import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { setTasks } from "../redux/slices/tasksSlice";
import type { RootState } from "../redux/store";
import type { Task } from "../types/TasksType";

export const useTasks = () => {
  const dispatch = useDispatch();
  const userID = useSelector((state: RootState) => state.auth.userID);

  useEffect(() => {
    if (!userID) return;

    const q = query(collection(db, "tasks"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const allTasks: Task[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Task, "id" | "isAdditional">;

        return {
          id: doc.id,
          ...data,
          isAdditional: !data.assigneeId, // ✅ Aquí marcamos si es adicional
        };
      });

      // ✅ Filtra tareas asignadas al usuario o sin asignar
      const userTasks = allTasks.filter(
        (t) => t.assigneeId === userID || !t.assigneeId
      );

      dispatch(setTasks(userTasks));
    });

    return () => unsubscribe();
  }, [dispatch, userID]);
};
