import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  path: "/home",
};
const topNavSlice = createSlice({
  name: "topnav",
  initialState,
  reducers: {
    updateTopNav(state, action: PayloadAction<string>) {
      state.path = action.payload;
    },
  },
});

export const { updateTopNav } = topNavSlice.actions;
export default topNavSlice.reducer;
