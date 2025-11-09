import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/TasksType";
interface TasksState {
  tasks: Task[];
}

const initialState: TasksState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
    },
    clearTasks: (state) => {
      state.tasks = [];
    },
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    },
  },
});

export const { addTask, setTasks, deleteTask, clearTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
