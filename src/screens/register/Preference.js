import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
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
import { useSelector } from 'react-redux';


const Preference = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedGods, setSelectedGods] = useState([]);
  const [preferencesList, setPreferencesList] = useState([]); // Store preferences list
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch preferences list from the API
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const jwt = await AsyncStorage.getItem("jwtToken");
        console.log(jwt)
        const response = await fetch("http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/preferences/getAllPreference", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
    
        const jsonData = await response.json(); // Directly parse JSON
        console.log("Parsed Data:", jsonData); // Check if the 'data' field is an array
        if (Array.isArray(jsonData.data)) {
          setPreferencesList(jsonData.data);
        } else {
          console.log("Received data is not an array:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching preferences:", error);
      } finally {
        setLoading(false);
      }
    };
    
  
    fetchPreferences();
  }, []);

  // Get user data from Redux store
  const { name, age, religion, destination, boardingTime, preferences } = useSelector((state) => state.user);

  // Toggle selection of preferences
  const handleSelectGod = (god) => {
    setSelectedGods((prevSelectedGods) => {
      const updatedSelectedGods = prevSelectedGods.includes(god)
        ? prevSelectedGods.filter((item) => item !== god)
        : [...prevSelectedGods, god];
  
      // Log selected preferences' name and ID
      const selectedPreferences = preferencesList.filter((preference) =>
        updatedSelectedGods.includes(preference.preferencesName)
      );
  
      console.log("Selected Preferences:", selectedPreferences);
  
      return updatedSelectedGods;
    });
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
  const onSubmit = async () => {
    const userId = await AsyncStorage.getItem("userId"); 
    const jwt = await AsyncStorage.getItem("jwtToken"); 

    // Ensure preferences are formatted correctly
    const preferencesFormatted = preferencesList
      .filter((preference) => selectedGods.includes(preference.preferencesName))
      .map(({ preferencesId, preferencesName }) => ({
        preferencesId,
        preferencesName, // Ensure it's a string
      }));

    console.log("Formatted Preferences:", preferencesFormatted);

    const requestBody = {
        userId: userId ? parseInt(userId, 10) : null,
        userName: name,
        userAge: age,
        userReligion: religion,
        userTravelDestination: destination,
        userTravelBoardingTime: boardingTime.replace(/\u200E|\u200F/g, "").trim(),
        preferences: preferencesFormatted, // Use correctly formatted preferences
    };

    console.log("Final Request Body:", JSON.stringify(requestBody, null, 2));

    try {
        const response = await fetch("http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/user/registerUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP Error! Status: ${response.status}, Message: ${errorText}`);
        }

        const data = await response.json();
        console.log("Response Data:", data);
    } catch (error) {
        console.error("Error submitting data:", error);
    }
};

  
  
  

  if (loading) {
    return <Text>Loading preferences...</Text>; // Show loading message while fetching data
  }

  return (
    <LinearGradient style={styles.login} locations={[0, 1]} colors={["#dacaff", "#f4ffe1"]} useAngle={true} angle={180}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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
              {preferencesList.map((preference) => (
                <TouchableOpacity
                  key={preference.preferencesId}
                  style={[styles.godButton, selectedGods.includes(preference.preferencesName) && styles.selectedButton]}
                  onPress={() => handleSelectGod(preference.preferencesName)}
                >
                  <Text style={[styles.godButtonText, selectedGods.includes(preference.preferencesName) && styles.selectedButtonText]}>
                    {preference.preferencesName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
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
    color: "#fff",
    fontSize: 16,
  },
});

export default Preference;
