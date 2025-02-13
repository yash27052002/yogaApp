// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // assuming the slice is in the same directory

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
