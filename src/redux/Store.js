import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // assuming the slice is in the same directory
import userReducer from './formSlice'; // assuming this slice is in the same directory

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // Combine the reducers here under a single `reducer` object
  },
});

export default store;
