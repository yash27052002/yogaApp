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
  Modal,
  FlatList,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import SVG icons
import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Ellipse3 from "../assets/Ellipse3.svg";
import Ellipse4 from "../assets/Ellipse4.svg";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";

// Import themes
import { lightTheme, darkTheme } from "../styles/themes.js";

const { width, height } = Dimensions.get("window");

const Preferance = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const { control, handleSubmit, setValue } = useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGods, setSelectedGods] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // List of god names
  const gods = [
    "Shiva",
    "Vishnu",
    "Brahma",
    "Krishna",
    "Ganesha",
    "Karthikeya",
    "Hanuman",
    "Durga",
    "Parvathi",
    "Lakshmi",
    "Saraswathi",
  ];

  // Function to handle button press and toggle selection
  const handleSelectGod = (god) => {
    setSelectedGods((prevSelectedGods) =>
      prevSelectedGods.includes(god)
        ? prevSelectedGods.filter((item) => item !== god)
        : [...prevSelectedGods, god]
    );
  };

  // Choose the theme based on the passed prop or context
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  const isTablet = width >= 768; // Check if the device is a tablet (width >= 768)

  const storeRandomCode = async () => {
    const randomCode = Math.random().toString(36).substring(7); // Generates a random string
    try {
      await AsyncStorage.setItem('randomCode', randomCode);
      console.log('Random code stored:', randomCode); // Optional: Log the stored code for confirmation
    } catch (error) {
      console.error('Error storing random code', error);
    }
  };

  // onSubmit function to handle form submission
  const onSubmit = () => {
    storeRandomCode();
    console.log("Selected Religion:", selectedGods);
    setIsAuthenticated(true);
  };

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

            <View style={styles.godButtonsContainer}>
              {gods.map((god) => (
                <TouchableOpacity
                  key={god}
                  style={[
                    styles.godButton,
                    selectedGods.includes(god) && styles.selectedButton,
                  ]}
                  onPress={() => handleSelectGod(god)}
                >
                  <Text
                    style={[
                      styles.godButtonText,
                      selectedGods.includes(god) && styles.selectedButtonText,
                    ]}
                  >
                    {god}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
              onPress={handleSubmit(onSubmit)} // This will trigger onSubmit function
            >
              <Text style={[styles.buttonText]}>Submit</Text>
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
  },
  godButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,  // Adjust spacing between buttons
    marginBottom: 30,
  },
  godButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#6a4cff",
  },
  godButtonText: {
    fontSize: 14,
    color: "#000",
  },
  selectedButtonText: {
    color: "#fff",
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

export default Preferance;
