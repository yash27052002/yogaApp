import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/formSlice"; // Ensure setUserData is imported correctly
import { useNavigation } from "@react-navigation/native";

// Import SVG icons
import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Ellipse3 from "../assets/Ellipse3.svg";
import Ellipse4 from "../assets/Ellipse4.svg";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";

// Import themes
import { lightTheme, darkTheme } from "../styles/themes.js"; 

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ theme = "light" }) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // Handle form submission
  const handleContinue = async (data) => {
    console.log('Navigating to Religion');

    navigation.navigate('Religion');

    console.log('Form Data:', data);
  
    // Await dispatch if it's async
    await dispatch(setUserData(data)); 
  
  };
  
  

  // Choose the theme based on the passed prop or context
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  const isTablet = width >= 768;  // Check if the device is a tablet (width >= 768)

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
              <LotusYoga width={isTablet ? 150 : 100} height={isTablet ? 250 : 171} style={styles.lotusIcon} />
            </View>

            {/* Register Form */}
            <View style={styles.formContainer}>
              <Text style={[styles.loginText, { color: currentTheme.textColor }]}>
                Enter your Name
              </Text>

              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="name" // Ensure this matches the data you're collecting
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.input]}
                      placeholder="Name"
                      placeholderTextColor="#9f9e9e"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>

              <Text style={[styles.loginText, { color: currentTheme.textColor }]}>
                Enter your Age
              </Text>

              <View style={styles.inputContainer}>
                <Controller
                  control={control}
                  name="age"  // Ensure the name matches
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.input]}
                      placeholder="Age"
                      placeholderTextColor="#9f9e9e"
                      onChangeText={onChange}
                      value={value}
                      keyboardType="phone-pad"
                    />
                  )}
                />
              </View>

              {/* Buttons - Aligned Horizontally */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.mobileButton, { backgroundColor: currentTheme.buttonBackground }]}
                  onPress={handleSubmit(handleContinue)} // Corrected to use handleSubmit
                >
                  <Text style={[styles.buttonText]}>
                    Continue
                  </Text>
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
    paddingBottom: 50, // Add padding at the bottom to make space for buttons
  },
  container: {
    width: width * 0.9,
    alignItems: "center",
    gap: 40,
    paddingTop: 20, // Add some top padding for better spacing
  },
  svgContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -10, // Reduce space between Ellipse4 and LotusYoga
  },
  svgItem: {
    marginBottom: 20,
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
    fontSize: 18,
    fontFamily: "Verdana",
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  buttonRow: {
    flexDirection: "column",
    justifyContent: "center",
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
  mobileButton: {
    borderWidth: 1,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
  },
  orText: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
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
  },
});

export default RegisterScreen;
