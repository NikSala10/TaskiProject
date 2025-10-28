import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  userID: string;
  username: string,
  avatar?: string;
  isLoading: boolean;
}

const initialState: InitialState = {
  userID: "",
  username: "",
  avatar: "",
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ uid: string; username: string; avatar: string }>) => {
      state.userID = action.payload.uid;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.userID = "";
      state.username = "";
      state.avatar = "";
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading } = authSlice.actions;
export default authSlice.reducer;