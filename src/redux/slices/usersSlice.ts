// redux/slices/usersSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface User {
  uid: string;
  username: string;
  numPoints: number;
  avatar: string;
  role: string;
}

interface UsersState {
  users: User[];
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: true,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.isLoading = false;
    },
    clearUsers: (state) => {
      state.users = [];
      state.isLoading = false;
    },
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;
export default usersSlice.reducer;
