import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  name: string;
  email: string;
};

//Estado inicial
const initialState: InitialState = {
  name: "",
  email: "",
};

// 1. Darle un nombre al slice
// 2. Pasar el estado inicial
// 3. Crear el reducer con las actions
export const authSlice = createSlice({
  name: "auth",
  initialState,
  //Reducer contiene las actiones para determinar que es lo que cambia del estado inicial
  reducers: {
    //Actions
    setNameState: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

//Destructurar las actions para exportarlas de manera individual
export const { setNameState } = authSlice.actions;

//Exportar el reducer del slice
export default authSlice.reducer;