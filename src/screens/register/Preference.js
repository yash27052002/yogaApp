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
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import { setPreference } from "../../redux/formSlice"; // Import Redux action
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import SVG icons
import Ellipse1 from "../../assets/Ellipse1.svg";
import Ellipse2 from "../../assets/Ellipse2.svg";
import Ellipse3 from "../../assets/Ellipse3.svg";
import Ellipse4 from "../../assets/Ellipse4.svg";
import LotusYoga from "../../assets/lotus-yoga_svgrepo.com.svg";

const { width } = Dimensions.get("window");

const Preference = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedGods, setSelectedGods] = useState([]);

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

  // Toggle selection of preferences
  const handleSelectGod = (god) => {
    setSelectedGods((prevSelectedGods) =>
      prevSelectedGods.includes(god)
        ? prevSelectedGods.filter((item) => item !== god)
        : [...prevSelectedGods, god]
    );
  };

  const storeRandomCode = async () => {
    const randomCode = Math.random().toString(36).substring(7);
    try {
      await AsyncStorage.setItem("randomCode", randomCode);
      console.log("Random code stored:", randomCode);
    } catch (error) {
      console.error("Error storing random code", error);
    }
  };

  // Submit form and update Redux store
  const onSubmit = () => {
    storeRandomCode();

    // Map selected preferences to expected structure
    const formattedPreferences = selectedGods.map((name, index) => ({
      preferencesId: index + 1,
      preferencesName: name,
    }));

    // Dispatch the action
    dispatch(setPreference(formattedPreferences));

    console.log("Selected Preferences:", formattedPreferences);
    navigation.navigate("NextScreen"); // Change to your next screen
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
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            {/* SVG Icons */}
            <View style={styles.svgContainer}>
              <Ellipse1 width={7} height={7} style={styles.svgItem} />
              <Ellipse2 width={15} height={14} style={styles.svgItem} />
              <Ellipse3 width={22} height={22} style={styles.svgItem} />
              <Ellipse4 width={30} height={29} />
              <LotusYoga width={100} height={171} style={styles.lotusIcon} />
            </View>

            {/* Preference Selection */}
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
              style={styles.button}
              onPress={onSubmit} // Directly call onSubmit
            >
              <Text style={styles.buttonText}>Submit</Text>
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
  godButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
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
    backgroundColor: "#6a4cff",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
    color: "#fff",
  },
});

export default Preference;
