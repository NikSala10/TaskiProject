
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Member {
  id: string;
  avatar?: string;
  username: string;
  role: string;
}

export interface PlanReviewGroup {
  id: string;
  name: string;
  planBudget: number;
  planDuration: string;
  startDate: string;
  ownerID: string;
  members: Member[];
}

interface PlanReviewState {
  groups: PlanReviewGroup[];
  isLoading: boolean;
}

const initialState: PlanReviewState = {
  groups: [],
  isLoading: false,
};

const planReviewSlice = createSlice({
  name: "planReview",
  initialState,
  reducers: {
    setPlanReviewGroups: (state, action: PayloadAction<PlanReviewGroup[]>) => {
      state.groups = action.payload;
    },
    setPlanReviewLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    updatePlanReviewGroupPeriod: (
      state,
      action: PayloadAction<{ groupId: string; planDuration: string }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.planDuration = action.payload.planDuration;
      }
    },
    updatePlanReviewGroupBudget: (
      state,
      action: PayloadAction<{ groupId: string; planBudget: number }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.planBudget = action.payload.planBudget;
      }
    },
  },
});

export const {
  setPlanReviewGroups,
  setPlanReviewLoading,
  updatePlanReviewGroupPeriod,
  updatePlanReviewGroupBudget,
} = planReviewSlice.actions;

export default planReviewSlice.reducer;