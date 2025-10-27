import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PageInfo {
  icon: React.ReactNode | null;
  name: string;
}

interface PageState {
  pageInfo: PageInfo;
}

const initialState: PageState = {
  pageInfo: {
    icon: null,
    name: "",
  },
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    setPageInfo: (state, action: PayloadAction<PageInfo>) => {
      state.pageInfo = action.payload;
    },
    clearPageInfo: (state) => {
      state.pageInfo = { icon: null, name: "" };
    },
  },
});

export const { setPageInfo, clearPageInfo } = pageSlice.actions;
export default pageSlice.reducer;
