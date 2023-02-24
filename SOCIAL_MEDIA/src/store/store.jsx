import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './uiSlice';
import currentuserSlice from './currentuserSlice';

const store = configureStore({
  reducer: { ui: uiSlice.reducer , userSlice : currentuserSlice.reducer},
});

export default store;
