import { configureStore } from "@reduxjs/toolkit";

//El store es el estado global, es decir, donde guardamos los datos con disponibilidad transversal
export const store = configureStore({
  reducer: {

  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;