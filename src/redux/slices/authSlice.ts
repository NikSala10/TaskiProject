import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  userID: string;
  username: string,
  avatar?: string;
  numPoints: number;
  isLoading: boolean;
}

const initialState: InitialState = {
  userID: "",
  username: "",
  avatar: "",
  numPoints: 0,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ uid: string; username: string; avatar: string, numPoints?: number }>) => {
      state.userID = action.payload.uid;
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
      state.numPoints = action.payload.numPoints ?? state.numPoints;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.userID = "";
      state.username = "";
      state.avatar = "";
      state.numPoints = 0;
      state.isLoading = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setPoints(state, action: PayloadAction<number>) {
      state.numPoints = action.payload;
    },
    addPoints(state, action: PayloadAction<number>) {
      state.numPoints += action.payload;
    },
    subtractPoints(state, action: PayloadAction<number>) {
      state.numPoints -= action.payload;
      if (state.numPoints < 0) state.numPoints = 0; // evitar negativos
    },
    setAvatar(state, action: PayloadAction<string>) {
      state.avatar = action.payload;
    },
  },
});

export const { setUser, clearUser, setLoading, addPoints,setPoints,subtractPoints, setAvatar  } = authSlice.actions;
export default authSlice.reducer;