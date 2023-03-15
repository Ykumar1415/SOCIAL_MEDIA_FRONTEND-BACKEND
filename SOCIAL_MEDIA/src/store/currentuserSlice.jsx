import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "ui",
  initialState: { userid:"" },
  reducers: {
    userID(state, action) {
      state.userid = action.payload;
    },
  },
});

export const userActions = userSlice.actions;

export default userSlice;
