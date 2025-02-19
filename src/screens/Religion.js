import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Picker } from "@react-native-picker/picker";
import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Ellipse3 from "../assets/Ellipse3.svg";
import Ellipse4 from "../assets/Ellipse4.svg";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";
import { lightTheme, darkTheme } from "../styles/themes.js";
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { setReligion } from "../redux/formSlice.js";
import { useForm } from "react-hook-form";

const { width, height } = Dimensions.get("window");

const Religion = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height; // Detect landscape orientation

  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  const [selectedReligion, setSelectedReligion] = useState("Select Religion");
  const [showPicker, setShowPicker] = useState(false); // Initialize state for showing the picker

  // List of religions for dropdown
  const religions = ["Hinduism", "Christianity", "Islam", "Buddhism", "Sikhism", "Jainism", "Others"];

  // Function to handle selection
  const handleSelectReligion = (religion) => {
    setSelectedReligion(religion);
    setShowPicker(false);
    setValue("religion", religion); // Set value in react-hook-form
  };

  const handleContinue = async () => {
    navigation.navigate('Destination');
    console.log("data passed to redux", selectedReligion);
    await dispatch(setReligion(selectedReligion));
  };

  // Choose the theme based on the passed prop or context
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
        <ScrollView 
          contentContainerStyle={[styles.scrollContainer, isLandscape && { transform: [{ scale: 1.0 }] }]} 
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.svgContainer}>
              <Ellipse1 width={isTablet ? 15 : 7} height={isTablet ? 15 : 7} style={styles.svgItem} />
              <Ellipse2 width={isTablet ? 30 : 15} height={isTablet ? 28 : 14} style={styles.svgItem} />
              <Ellipse3 width={isTablet ? 45 : 22} height={isTablet ? 45 : 22} style={styles.svgItem} />
              <Ellipse4 width={isTablet ? 60 : 30} height={isTablet ? 58 : 29} />
              <LotusYoga width={isTablet ? 150 : 100} height={isTablet ? 250 : 171} style={styles.lotusIcon} />
            </View>

            <View style={[styles.inputContainer , { width: isTablet ? 400 : "100%" }]}>
              <TouchableOpacity
                onPress={() => setShowPicker(!showPicker)} // Toggle picker visibility
                style={styles.pickerContainer}
              >
                <Text style={styles.pickerText}>{selectedReligion}</Text>
              </TouchableOpacity>

              {/* Render Picker only when it's needed */}
              {showPicker && (
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={selectedReligion}
                    onValueChange={(itemValue) => handleSelectReligion(itemValue)}
                    style={styles.picker}
                  >
                    <Picker.Item label="Select Religion" value="Select Religion" />
                    {religions.map((religion, index) => (
                      <Picker.Item key={index} label={religion} value={religion} />
                    ))}
                  </Picker>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: currentTheme.buttonBackground ,  width: isTablet ? 400 : "100%" }]}
              onPress={handleContinue}
            >
              <Text style={[styles.buttonText]}>Continue</Text>
            </TouchableOpacity>
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
    width: width * 0.9,
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
  inputContainer: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
    position: "relative",  // Required for absolute positioning of the picker
  },
  pickerContainer: {
    width: "100%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 10,
  },
  pickerText: {
    color: "#000",
  },
  pickerWrapper: {
    position: "absolute",
    top: 50, // Adjust the distance for Picker visibility
    left: 10,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: "100%",
    height: 150, // Set a fixed height for Picker
    backgroundColor: "#fff",
    color: "#000",
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default Religion;
