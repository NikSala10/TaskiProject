import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Member {
  id: string;
  avatar?: string;
  username: string;
  role: string;
  numPoints?: number;
}
export interface Group {
  id: string;
  name: string;
  description?: string;
  planBudget?: number;
  startDate?: string;
  planDuration?: string;
  ownerID?: string;
  inviteCode?: string;
  members: Member[];
}

interface GroupState {
  groups: Group[];
  currentGroup: Group | null;
  isLoading: boolean;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null,
  isLoading: false,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    addGroup: (state, action: PayloadAction<Group>) => {
      state.groups.push(action.payload);
      state.currentGroup = action.payload;
    },
    setGroups: (state, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    setCurrentGroup: (state, action: PayloadAction<Group | null>) => {
      state.currentGroup = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    deleteGroup: (state, action) => {
      const groupId = action.payload;
      state.groups = state.groups.filter((group) => group.id !== groupId);
    },
    addMemberToGroup: (
      state,
      action: PayloadAction<{ groupId: string; member: Member }>
    ) => {
      const group = state.groups.find((g) => g.id === action.payload.groupId);
      if (group) {
        group.members.push(action.payload.member);
      }
    },
  },
});

export const { addGroup, setGroups, setCurrentGroup, setLoading, addMemberToGroup, deleteGroup } = groupSlice.actions;
export default groupSlice.reducer;
