import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { ListVisible: false, userid : "", isLogin: false},
  reducers: {
    toggle(state) {
      state.ListVisible = !state.ListVisible;
    },
    userIDnew(state, action) {
      state.userid = action.payload
    }, 
    setlogin(state, action) {
      state.isLogin = action.payload;
    }
   
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
