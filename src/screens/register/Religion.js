import React, { useState, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ellipse1 from "../../assets/Ellipse1.svg";
import Ellipse2 from "../../assets/Ellipse2.svg";
import Ellipse3 from "../../assets/Ellipse3.svg";
import Ellipse4 from "../../assets/Ellipse4.svg";
import LotusYoga from "../../assets/lotus-yoga_svgrepo.com.svg";
import { lightTheme, darkTheme } from "../../styles/themes.js";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setReligion } from "../../redux/formSlice.js";
import { useForm } from "react-hook-form";

const { width, height } = Dimensions.get("window");

const Religion = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height; 

  const { control, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();

  const [selectedReligion, setSelectedReligion] = useState("Select Religion");
  const [showPicker, setShowPicker] = useState(false);
  const [religions, setReligions] = useState([]); 

  // Fetch religions from API
  useEffect(() => {
    const fetchReligions = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem("jwtToken");
        if (!jwtToken) throw new Error("JWT token not found");

        const response = await fetch(
          "http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/religion/getAllReligion",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );

        const result = await response.json();
        if (result.status === -1 && Array.isArray(result.data)) {
          setReligions(result.data.map((item) => item.religionName)); 
        } else {
          console.error("Unexpected API response:", result);
        }
      } catch (error) {
        console.error("Error fetching religions:", error);
      }
    };

    fetchReligions();
  }, []);

  // Function to handle selection
  const handleSelectReligion = (religion) => {
    setSelectedReligion(religion);
    setShowPicker(false);
    setValue("religion", religion); 
  };

  const religionData = useSelector((state) => state.user);

  const handleContinue = async () => {
    const { religion } = getValues();

    if (religion && religion !== "Select Religion") {
      dispatch(setReligion(religion)); 
    }

    console.log("Updated Religion:", religionData); 
    navigation.navigate("Destination"); 
  };

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

            <View style={[styles.inputContainer, { width: isTablet ? 400 : "100%" }]}>
              <TouchableOpacity
                onPress={() => setShowPicker(!showPicker)} 
                style={styles.pickerContainer}
              >
                <Text style={styles.pickerText}>{selectedReligion}</Text>
              </TouchableOpacity>

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
              style={[styles.button, { backgroundColor: currentTheme.buttonBackground, width: isTablet ? 400 : "100%" }]}
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
    position: "relative",
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
    top: 50, 
    left: 10,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 10,
    paddingHorizontal: 10,
  },
  picker: {
    width: "100%",
    height: 150, 
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
