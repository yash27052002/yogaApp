import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Platform, TextInput } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";

// Import SVG icons
import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Ellipse3 from "../assets/Ellipse3.svg";
import Ellipse4 from "../assets/Ellipse4.svg";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";
import AsyncStorage from '@react-native-async-storage/async-storage';


// Import themes
import { lightTheme, darkTheme } from "../styles/themes.js";

const { width } = Dimensions.get("window");

const BoardingTime = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      boardingTime: "", // Start with an empty string for the time
    },
  });

  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [manualTime, setManualTime] = useState("");
  const [selectedHours, setSelectedHours] = useState(null);
const [selectedMinutes, setSelectedMinutes] = useState(null);
const [showConfirmButton, setShowConfirmButton] = useState(false);

  // Set the initial boarding time when the component mounts
  useEffect(() => {
    setValue("boardingTime", selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, [selectedTime, setValue]);

  // Function to handle time change
  const handleTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();
  
      // Update hours and minutes
      setSelectedHours(hour);
      setSelectedMinutes(minute);
  
      // Show the confirm button only after both hour and minute are selected
      if (selectedHours !== null && selectedMinutes !== null) {
        setShowConfirmButton(true);
      }
    }
  };

  // Function to handle manual time input
  const handleManualTimeChange = (time) => {
    // Validate and format manual input, e.g., "14:30"
    const regex = /^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/;
    if (regex.test(time)) {
      setManualTime(time);
      setSelectedTime(new Date(`1970-01-01T${time}:00`)); // Set selectedTime based on the manual input
      setValue("boardingTime", time); // Update the form value
    } else {
      // Optionally, show an error for invalid time format
      console.log("Invalid time format");
    }
  };
  // Show a confirm button after selecting both hours and minutes
const handleConfirmTime = () => {
  // Set the selected time based on the selected hours and minutes
  const newSelectedTime = new Date();
  newSelectedTime.setHours(selectedHours);
  newSelectedTime.setMinutes(selectedMinutes);
  
  setSelectedTime(newSelectedTime);
  setShowTimePicker(false); // Close the time picker
  setShowConfirmButton(false);

};


  const onSubmit = async (data) => {
    console.log("Form data:", data);  // Log form data directly
    console.log("Selected Boarding Time:", data.boardingTime); // Log the form value directly
    await AsyncStorage.setItem('boardingTime', data.boardingTime);

    navigation.navigate("Preferance");
  };

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;
  const isTablet = width >= 768;

  return (
    <LinearGradient style={styles.login} locations={[0, 1]} colors={["#dacaff", "#f4ffe1"]} useAngle={true} angle={180}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
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

            {/* Time Selector */}
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.dropdown} onPress={() => setShowTimePicker(true)}>
                <Text style={styles.dropdownText}>
                  {selectedTime
                    ? selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
                    : "Select Time"}
                </Text>
              </TouchableOpacity>
            </View>

            {showTimePicker && (
  <DateTimePicker
    value={selectedTime}
    mode="time"
    is24Hour={true}
    display={Platform.OS === "ios" ? "spinner" : "default"}
    onChange={handleTimeChange}
  />
)}

{/* Show Confirm Button after selecting both hours and minutes */}
{showConfirmButton && (
  <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmTime}>
    <Text style={styles.confirmButtonText}>Confirm Time</Text>
  </TouchableOpacity>
)}


            {/* Submit Button */}
            <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
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
    borderColor: "#fff",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  dropdown: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#fff",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  manualInput: {
    width: "100%",
    height: 40,
    textAlign: "center",
    fontSize: 16,
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    borderRadius: 25,
    paddingVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  
  buttonText: {
    fontSize: 15,
    textAlign: "center",
  },
});

export default BoardingTime;
