import React, { useEffect, useState } from "react";
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

import axios from 'axios';


const { width } = Dimensions.get("window");
import { useSelector } from 'react-redux';

const Preference = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedGods, setSelectedGods] = useState([]);
  const [preferencesList, setPreferencesList] = useState([]);
  console.log(preferencesList)
  // Get user data from Redux store
  const { name, age, religion, destination, boardingTime, preferences } = useSelector((state) => state.user);


  useEffect(() => {
    const getPreference = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        const religionId= parseInt(await AsyncStorage.getItem("religionId"));
        console.log(token);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/preferences/getPreferenceByReligion?religionId=${religionId}`,
          config
        );

        const preferenceData = response.data.data.map((preference) => ({
          preferenceId: preference.preferencesId,
          preferenceName: preference.preferencesName,
        }));

        setPreferencesList(preferenceData);
        console.log("response from preference api", response.data);
      } catch (error) {
        console.error("error getting preference", error);
      }
    };
    getPreference();
  }, []);

  // Toggle selection of preferences
  const handleSelectGod = (preferenceName) => {
    setSelectedGods((prevSelectedGods) => {
      let updatedSelectedGods;
  
      if (prevSelectedGods.includes(preferenceName)) {
        updatedSelectedGods = prevSelectedGods.filter((item) => item !== preferenceName);
      } else {
        updatedSelectedGods = [...prevSelectedGods, preferenceName];
      }
  
      console.log("Updated Selected Preferences:", updatedSelectedGods); // Debugging Log
      return updatedSelectedGods;
    });
  };
  
  
  

  // Submit form and update Redux store
  const onSubmit = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const jwt = await AsyncStorage.getItem("jwtToken");

    const preferencesFormatted = preferencesList
    .filter((preference) => selectedGods.includes(preference.preferenceName)) // Fix the key reference
    .map(({ preferenceId, preferenceName }) => ({
      preferencesId: preferenceId, // Ensure correct key name
      preferencesName: preferenceName,
    }));
  
  
  

    console.log("Formatted Preferences:", preferencesFormatted);

    // Dispatch the updated Redux state before API call
    dispatch({
      type: "UPDATE_USER_PREFERENCES",
      payload: preferencesFormatted,
    });

    const requestBody = {
      userId: userId ? parseInt(userId, 10) : null,
      userName: name,
      userAge: age,
      userReligion: religion,
      userTravelDestination: destination,
      userTravelBoardingTime: boardingTime.replace(/\u200E|\u200F/g, "").trim(),
      preferences: preferencesFormatted,
    };

    console.log("Final Request Body:", JSON.stringify(requestBody, null, 2));

    try {
      const response = await fetch(
        "http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/user/registerUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${jwt}`,
          },
          body: JSON.stringify(requestBody),
        }
      );

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
      key={preference.preferenceId}
      style={[
        styles.godButton,
        selectedGods.includes(preference.preferenceName) && styles.selectedButton, // Fix here
      ]}
      onPress={() => handleSelectGod(preference.preferenceName)} // Fix here
    >
      <Text style={[
        styles.godButtonText,
        selectedGods.includes(preference.preferenceName) && styles.selectedButtonText, // Fix here
      ]}>
        {preference.preferenceName}
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
    width: width * 0.5,
        padding: 12,
    borderRadius: 25,
    alignItems: "center",
    backgroundColor: "#6a4cff",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Preference;
