import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for Google login API
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ email, idToken, navigation }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://9ecc4fee-d048-4e46-b001-e5b356e78e48.mock.pstmn.io/userRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, idToken }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');

      // Debugging the API response
      console.log('Google Login API Response:', data);
      alert('Google Login API Response: ' + JSON.stringify(data));

      // Navigate after successful login
      navigation.navigate('OtpScreen');  // Replace 'Home' with your target screen

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for phone number registration
export const phoneRegister = createAsyncThunk(
  'user/sendOtp',
  async ({ userPhoneNumber, navigation }, { rejectWithValue }) => {
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPhoneNumber }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Phone registration failed');

      // Debugging the API response
      console.log('Phone Registration API Response:', data);
      alert('Phone Registration API Response: ' + JSON.stringify(data));

      // Navigate after successful registration
      navigation.navigate('VerifyOTP');  // Replace with your OTP verification screen

      return { ...data, userPhoneNumber }; // Store phone number in the state
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  'user/validateOtp',
  async ({ otp, navigation }, { getState, rejectWithValue }) => {
    try {
      const { userPhoneNumber } = getState().auth; // Retrieve phone number from state
      if (!userPhoneNumber) throw new Error('Phone number not found');

      const response = await fetch('https://50.18.12.185:8443/YogaApp-0.0.1-SNAPSHOT/verifyOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPhoneNumber, otp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed');

      // Debugging the API response
      console.log('OTP Verification API Response:', data);
      alert('OTP Verification API Response: ' + JSON.stringify(data));

      // Store JWT Token & Refresh Token in AsyncStorage after OTP verification
      await AsyncStorage.setItem('jwtToken', data.jwtToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);

      // Navigate after successful OTP verification
      navigation.navigate('Dashboard');  // Replace 'Dashboard' with your target screen

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for logging out
export const logout = createAsyncThunk('auth/logout', async () => {
  await AsyncStorage.removeItem('jwtToken');
  await AsyncStorage.removeItem('refreshToken');
  return null;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    loading: false, 
    error: null, 
    phoneRegistered: false, 
    otpVerified: false, 
    userPhoneNumber: null 
  },
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
      })
      .addCase(phoneRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(phoneRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.phoneRegistered = true;
        state.userPhoneNumber = action.payload.userPhoneNumber;
      })
      .addCase(phoneRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.otpVerified = true;
        state.user = action.payload;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.otpVerified = false;
        state.phoneRegistered = false;
        state.userPhoneNumber = null;
      });
  },
});

export default authSlice.reducer;
