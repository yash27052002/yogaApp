import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Async thunk for Google login API
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async ({ userEmail, accessToken, navigation }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/user/ssoCheck', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail, accessToken }),
      });

      // Log the full response before parsing JSON
      const rawResponse = await response.text();
      console.log('Raw API Response:', response);

      // Try parsing JSON only if response is OK
      if (!response.ok) {
        throw new Error(rawResponse || 'Login failed');
      }

      const data = JSON.parse(rawResponse);
      console.log('Parsed API Response:', data);
      console.log('Parsed API Response:', data.jwt);
      console.log('Parsed API Response:', data.userId);

      await AsyncStorage.setItem('jwtToken', data.jwt);
      await AsyncStorage.setItem('userId', data.userId.toString()); // Storing user ID
      await AsyncStorage.setItem('userStatus', JSON.stringify(data.userRegistered));







      // Navigate after successful login
      navigation.navigate('Register');

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return rejectWithValue(error.message);
    }
  }
);


// Async thunk for phone number registration
export const phoneRegister = createAsyncThunk(
  'user/sendOtp',
  async ({ userPhoneNumber, navigation }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/user/sendOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userPhoneNumber }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Phone registration failed');

      // Debugging API response
      console.log('Phone Registration API Response:', data);

      // 🔹 Store userPhoneNumber in AsyncStorage
      await AsyncStorage.setItem('userPhoneNumber', userPhoneNumber);

      // Navigate after successful registration
      navigation.navigate('OtpScreen');

      return { ...data, userPhoneNumber }; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Async thunk for verifying OTP
export const verifyOtp = createAsyncThunk(
  'user/validateOtp',
  async ({ userOtp, navigation }, { rejectWithValue }) => {
    try {
      const userMobileNumber = await AsyncStorage.getItem('userPhoneNumber');
      console.log('Retrieved userPhoneNumber:', userMobileNumber);
      if (!userMobileNumber) throw new Error('Phone number not found');
      console.log('User OTP:', userOtp);

      const response = await fetch('http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/user/validateOtp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMobileNumber, userOtp }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'OTP verification failed');

      console.log('OTP Verification API Response:', data);
      console.log('OTP Verification API Response: ' + JSON.stringify(data));

      // Save the user information and tokens to AsyncStorage
      await AsyncStorage.setItem('jwtToken', data.jwt);
      await AsyncStorage.setItem('refreshToken', data.token);
      await AsyncStorage.setItem('userPhoneNumber', data.username); // Storing username as phone number
      await AsyncStorage.setItem('userId', data.id.toString()); // Storing user ID
      await AsyncStorage.setItem('userStatus', JSON.stringify(data.userRegistered));

      // Navigate to the Register screen after successful login
      navigation.navigate('Register');

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
  await AsyncStorage.removeItem('userPhoneNumber');  // 🔹 Clear stored phone number
  await AsyncStorage.removeItem('userStatus');  

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
