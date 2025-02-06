import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API endpoint
const API_URL = "https://example.com/api/login"; // Replace with actual API endpoint

// Async function to handle login
export const loginUser = createAsyncThunk("auth/loginUser", async (phoneNumber, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, { phone: phoneNumber });
    return response.data; // Expecting OTP or a token in response
  } catch (error) {
    return rejectWithValue(error.response?.data || "Something went wrong");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // Store user data or OTP response
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
