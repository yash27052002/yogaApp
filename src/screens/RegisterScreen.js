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
import { setUserData } from "../redux/formSlice"; 
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Ellipse3 from "../assets/Ellipse3.svg";
import Ellipse4 from "../assets/Ellipse4.svg";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";

import { lightTheme, darkTheme } from "../styles/themes.js"; 

const { width, height } = Dimensions.get("window");

const RegisterScreen = ({ theme = "light" }) => {
  const { control, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleContinue = async (data) => {
    await AsyncStorage.setItem('userName', data.name);

    console.log('Navigating to Religion');
    navigation.navigate('Religion');
    console.log('Form Data:', data);
    await dispatch(setUserData(data)); 
  };

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;
  const isTablet = width >= 768;

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
            <View style={styles.svgContainer}>
              <Ellipse1 width={isTablet ? 15 : 7} height={isTablet ? 15 : 7} style={styles.svgItem} />
              <Ellipse2 width={isTablet ? 30 : 15} height={isTablet ? 28 : 14} style={styles.svgItem} />
              <Ellipse3 width={isTablet ? 45 : 22} height={isTablet ? 45 : 22} style={styles.svgItem} />
              <Ellipse4 width={isTablet ? 60 : 30} height={isTablet ? 58 : 29} />
              <LotusYoga width={isTablet ? 150 : 100} height={isTablet ? 250 : 171} style={styles.lotusIcon} />
            </View>

            <View style={styles.formContainer}>
              {/* Name Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Name</Text>
                <Controller
                  control={control}
                  name="name"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.input]}
                      placeholder="Enter your name"
                      placeholderTextColor="#9f9e9e"
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
              </View>

              {/* Age Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.label}>Age</Text>
                <Controller
                  control={control}
                  name="age"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={[styles.input]}
                      placeholder="Enter your age"
                      placeholderTextColor="#9f9e9e"
                      onChangeText={onChange}
                      value={value}
                      keyboardType="phone-pad"
                    />
                  )}
                />
              </View>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.button, styles.mobileButton, { backgroundColor: currentTheme.buttonBackground }]}
                  onPress={handleSubmit(handleContinue)}
                >
                  <Text style={[styles.buttonText]}>Continue</Text>
                </TouchableOpacity>
              </View>
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
  inputWrapper: {
    width: "100%",
    marginBottom: 15,
  },
  label: {
    fontSize: width >= 768 ? 18 : 14,
    color: "#333",
    marginBottom: 5,
    marginLeft: 10,
    fontWeight: "bold",
  },
  input: {
    fontSize: 18,
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
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
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default RegisterScreen;
