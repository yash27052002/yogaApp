import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, TextInput, ScrollView, useWindowDimensions, KeyboardAvoidingView, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Ellipse1 from "../../assets/Ellipse1.svg";
import Ellipse2 from "../../assets/Ellipse2.svg";
import Ellipse3 from "../../assets/Ellipse3.svg";
import Ellipse4 from "../../assets/Ellipse4.svg";
import LotusYoga from "../../assets/lotus-yoga_svgrepo.com.svg";
import { lightTheme, darkTheme } from "../../styles/themes.js"; 
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { verifyOtp } from '../../redux/authSlice.js'; // Rename to avoid conflict with function name
import axios from 'axios';

const { width, height } = Dimensions.get("window");

const OtpScreen = ({ theme = "light" }) => {
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height; // Detect landscape orientation
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // State to manage OTP input
  const [otp, setOtp] = useState(["", "", "", ""]);

  // Refs for OTP inputs
  const inputRefs = useRef([]);

  // Handle OTP input change
  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    if (text === "") {
      newOtp[index] = ""; // Clear current field
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else {
      newOtp[index] = text.replace(/[^0-9]/g, ""); // Allow only numbers
      if (index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
    setOtp(newOtp);
  };

  const handleVerifyOtp = () => {
    const otpValue = otp.join(""); // Convert array to a string
    if (otpValue.length < 4) {
      alert("Please enter a valid 4-digit OTP.");
      return;
    }
    
    // Dispatch Redux action
    dispatch(verifyOtp({ userOtp: otpValue, navigation }))
    .unwrap()
      .then((response) => {
        alert("OTP verified successfully! Please check your phone.");
      })
      .catch((error) => {
        alert("Failed to verify OTP: " + error);
        console.log("Failed to verify OTP: " + error)
      });
  };

  return (
    <LinearGradient
      style={styles.login}
      locations={[0, 1]}
      colors={["#dacaff", "#f4ffe1"]}
      useAngle={true}
      angle={180}
    >
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={[styles.scrollContainer, isLandscape && { transform: [{ scale: 1.0 }] }]} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.mainContainer, { paddingHorizontal: isTablet ? 30 : 15 }]}>
            {/* SVG items */}
            <View style={styles.svgContainer}>
              <Ellipse1 width={isTablet ? 15 : 7} height={isTablet ? 15 : 7} style={styles.svgItem} />
              <Ellipse2 width={isTablet ? 30 : 15} height={isTablet ? 28 : 14} style={styles.svgItem} />
              <Ellipse3 width={isTablet ? 45 : 22} height={isTablet ? 45 : 22} style={styles.svgItem} />
              <Ellipse4 width={isTablet ? 60 : 30} height={isTablet ? 58 : 29} style={styles.svgItem} />
              <LotusYoga width={isTablet ? 150 : 100} height={isTablet ? 250 : 171} style={styles.lotusIcon} />
            </View>

            {/* OTP Frame */}
            <View style={styles.otpFrameContainer}>
              <View style={styles.verifyOtpParent}>
                <Text style={styles.verifyOtp}>Verify OTP</Text>
                <View style={styles.frameContainer}>
                  {/* 4 OTP Input Boxes */}
                  {otp.map((digit, index) => (
                    <TextInput
                      key={index}
                      style={styles.frameItem}
                      value={digit}
                      onChangeText={(text) => handleOtpChange(text, index)}
                      keyboardType="numeric"
                      maxLength={1}
                      ref={(ref) => inputRefs.current[index] = ref} // Add refs for each input
                    />
                  ))}
                </View>
              </View>
              <Text style={styles.resendOtpInContainer}>
                <Text style={styles.resendOtpIn}>Resend OTP in</Text>
                <Text style={styles.text}>: 1:20</Text>
              </Text>
            </View>

            {/* Verify OTP Button */}
            <View style={styles.verifyOtpWrapper}>
              <TouchableOpacity
                style={[styles.button, styles.mobileButton, { backgroundColor: currentTheme.buttonBackground }]}
                onPress={handleVerifyOtp}
              >
                <Text style={[styles.buttonText]}>
                  Verify Otp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  login: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",  // Center content vertically
    alignItems: "center",  // Center content horizontally
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  mainContainer: {
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
  svgItem: {
    marginBottom: 20,
  },
  lotusIcon: {
    marginTop: -40,
  },
  otpFrameContainer: {
    alignItems: "center",
    gap: 30,
    width: "100%",
  },
  verifyOtpParent: {
    gap: 20,
    alignItems: "center",
  },
  verifyOtp: {
    fontSize: 20,
    fontFamily: "Verdana",
    fontWeight: "700",
  },
  frameContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  frameItem: {
    width: 43,
    height: 43,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  resendOtpInContainer: {
    fontSize: 16,
    textAlign: "center",
    color: "#000",
  },
  resendOtpIn: {
    fontWeight: "700",
    fontFamily: "Manrope-Bold",
  },
  text: {
    fontFamily: "Manrope-Regular",
  },
  verifyOtpWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: "80%",
    minWidth: 200, // Minimum width for the button
    maxWidth: 350,
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  mobileButton: {
    borderWidth: 1,
    borderColor: "#000",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Oranienbaum-Regular",
  },
});

export default OtpScreen;
