import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for Google login API
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ email, idToken }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://9ecc4fee-d048-4e46-b001-e5b356e78e48.mock.pstmn.io/userRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, idToken }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
