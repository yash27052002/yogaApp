import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Import SVG icons
import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Ellipse3 from "../assets/Ellipse3.svg";
import Ellipse4 from "../assets/Ellipse4.svg";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";
import GoogleIcon from "../assets/google-color_svgrepo.com.svg";

// Import themes
import { lightTheme, darkTheme } from "../styles/themes.js"; 
import { useDispatch } from 'react-redux';
import { googleLogin } from '../redux/authSlice.js'; // Import your action


GoogleSignin.configure({
  webClientId: '968763437649-9cq1vtnj2ssag10u0hke0mgmjaqn5i4q.apps.googleusercontent.com',
  iosClientId: '968763437649-47ue230k96ni2d5shup0d4h213vd6s45.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

const Login = ({ theme = "light" }) => {
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();  // Hook to access dispatch function


  const GoogleLogin = async () => {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('User Info:', userInfo);  // Log user info to verify structure
    return userInfo;
  };
  
  const handleGoogleSignIn = async () => {
    try {
      const response = await GoogleLogin();
      const { email, idToken } = response.data.user;  // Access user info properly
  
      // Dispatch action to send data to API
      await dispatch(googleLogin({ email, idToken }));
  
      // Navigate on success
      if (response.data.user) navigation.navigate('Register');
    } catch (error) {
      console.error('Login Error:', error);
    }
  };
  
  const handlePhoneNumber = () =>{
    navigation.navigate('OtpScreen');
  }
  // Choose the theme based on the prop
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <LinearGradient
      style={styles.login}
      locations={[0, 1]}
      colors={["#dacaff", "#f4ffe1"]}
      useAngle={true}
      angle={180}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>

            {/* SVG Icons */}
            <View style={styles.svgContainer}>
            <Ellipse1 width={isTablet ? 15 : 7} height={isTablet ? 15 : 7} style={styles.svgItem} />
              <Ellipse2 width={isTablet ? 30 : 15} height={isTablet ? 28 : 14} style={styles.svgItem} />
              <Ellipse3 width={isTablet ? 45 : 22} height={isTablet ? 45 : 22} style={styles.svgItem} />
              <Ellipse4 width={isTablet ? 60 : 30} height={isTablet ? 58 : 29} />
              <LotusYoga width={isTablet ? 200 : 120} height={isTablet ? 300 : 180} style={styles.lotusIcon} />
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <Text style={[styles.loginText, { fontSize: isTablet ? 22 : 18, color: currentTheme.textColor }]}>
                Login with your Phone Number
              </Text>

              <View style={[styles.inputContainer, { width: isTablet ? "80%" : "100%" }]}>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Phone number"
                      placeholderTextColor="#9f9e9e"
                      onChangeText={onChange}
                      value={value}
                      keyboardType="phone-pad"
                    />
                  )}
                />
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.mobileButton, { backgroundColor: currentTheme.buttonBackground }]}
                  onPress={handleSubmit(handlePhoneNumber)}
                >
                  <Text style={styles.buttonText}>Verify with Mobile</Text>
                </TouchableOpacity>

                <Text style={[styles.orText, { color: currentTheme.orTextColor }]}>- or -</Text>

                <TouchableOpacity 
                  style={[styles.button, styles.googleButton, { backgroundColor: currentTheme.googleButtonBackground }]}
                  onPress={handleGoogleSignIn}
                >
                  <GoogleIcon width={25} height={25} />
                  <Text style={styles.googleText}>Sign in with Google</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
  login: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  container: {
    width: "90%",
    alignItems: "center",
    gap: 40,
    paddingTop: 20,
  },
  svgContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -10,
  },
  lotusIcon: {
    marginTop: -20,
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: -10,
  },
  loginText: {
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 15,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  buttonRow: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingHorizontal: 15,
  },
  googleText: {
    fontSize: 15,
    color: '#fff',

  },
  svgItem: {
    marginBottom: 20,
  },
});

export default Login;
