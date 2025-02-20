import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  age: "",
  religion: "",
  destination: "",
  boardingTime: "",
  preferences: [], // Array of selected preferences with ID and name
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload }; // Update only provided fields
    },
    setReligion: (state, action) => {
      state.religion = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setBoardingTime: (state, action) => {
      state.boardingTime = action.payload;
    },
    setPreference: (state, action) => {
      state.preferences = action.payload.map((name, index) => ({
        preferencesId: index + 1, // Assign an ID starting from 1
        preferencesName: name,
      }));
    },
  },
});

export const {
  setUserData,
  setReligion,
  setDestination,
  setBoardingTime,
  setPreference,
} = userSlice.actions;

export default userSlice.reducer;
