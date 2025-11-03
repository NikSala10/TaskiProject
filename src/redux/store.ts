import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import pageSlice from "./slices/pageSlice";
import groupSlice from "./slices/groupsSlice";
import tasksSlice from "./slices/tasksSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    page: pageSlice,
    group: groupSlice,
    tasks: tasksSlice,
  },
  // Desactiva el aviso de que no deja guardar iconos en redux
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;