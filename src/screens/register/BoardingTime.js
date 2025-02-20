import React, { useState, useEffect } from "react";
import { 
  View, Text, TouchableOpacity, StyleSheet, Dimensions, ScrollView, 
  KeyboardAvoidingView, Platform, useWindowDimensions 
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Redux
import { useDispatch, useSelector } from "react-redux";
import { setBoardingTime } from "../../redux/formSlice.js";

// Import SVG icons
import Ellipse1 from "../../assets/Ellipse1.svg";
import Ellipse2 from "../../assets/Ellipse2.svg";
import Ellipse3 from "../../assets/Ellipse3.svg";
import Ellipse4 from "../../assets/Ellipse4.svg";
import LotusYoga from "../../assets/lotus-yoga_svgrepo.com.svg";

// Import themes
import { lightTheme, darkTheme } from "../../styles/themes.js";

const { width } = Dimensions.get("window");

const BoardingTime = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height;

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      boardingTime: "",
    },
  });

  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedHours, setSelectedHours] = useState(null);
  const [selectedMinutes, setSelectedMinutes] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  // Redux State
  const boardingTimeData = useSelector((state) => state.user);

  useEffect(() => {
    setValue("boardingTime", selectedTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
  }, [selectedTime, setValue]);

  // Function to handle time change
  const handleTimeChange = (event, selectedDate) => {
    if (selectedDate) {
      const hour = selectedDate.getHours();
      const minute = selectedDate.getMinutes();
  
      setSelectedHours(hour);
      setSelectedMinutes(minute);
  
      if (selectedHours !== null && selectedMinutes !== null) {
        setShowConfirmButton(true);
      }
    }
  };

  const handleConfirmTime = () => {
    const newSelectedTime = new Date();
    newSelectedTime.setHours(selectedHours);
    newSelectedTime.setMinutes(selectedMinutes);
  
    setSelectedTime(newSelectedTime);
    setShowTimePicker(false);
    setShowConfirmButton(false);
  };

  const onSubmit = async (data) => {
    dispatch(setBoardingTime(data.boardingTime));  // ✅ Dispatch Redux action
    console.log("Form data:", data);

    await AsyncStorage.setItem('boardingTime', data.boardingTime);

      console.log("Updated Redux State:", boardingTimeData); // ✅ Log Redux State
      navigation.navigate("Preference");  // ✅ Navigate after Redux update

  };

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <LinearGradient style={styles.login} locations={[0, 1]} colors={["#dacaff", "#f4ffe1"]} useAngle={true} angle={180}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.scrollContainer, isLandscape && { transform: [{ scale: 1.0 }] }]} keyboardShouldPersistTaps="handled">
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
            <View style={[styles.inputContainer, { width: isTablet ? 400 : "100%" }]}>
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

            {/* Show Confirm Button */}
            {showConfirmButton && (
              <TouchableOpacity style={[styles.confirmButton, { width: isTablet ? 400 : "100%" }]} onPress={handleConfirmTime}>
                <Text style={styles.confirmButtonText}>Confirm Time</Text>
              </TouchableOpacity>
            )}

            {/* Submit Button */}
            <TouchableOpacity style={[styles.button, { backgroundColor: currentTheme.buttonBackground, width: isTablet ? 400 : "100%" }]} onPress={handleSubmit(onSubmit)}>
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
  confirmButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
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

export default BoardingTime;
