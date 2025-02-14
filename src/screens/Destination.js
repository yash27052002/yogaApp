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
  TextInput,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";

import { useNavigation } from '@react-navigation/native';
import Ellipse1 from "../assets/Ellipse1.svg";
import Ellipse2 from "../assets/Ellipse2.svg";
import Ellipse3 from "../assets/Ellipse3.svg";
import Ellipse4 from "../assets/Ellipse4.svg";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";

// Import themes
import { lightTheme, darkTheme } from "../styles/themes.js";
import { setDestination, setReligion } from "../redux/formSlice.js";

const { width, height } = Dimensions.get("window");

const Destination = ({ theme = "light" }) => {
  const navigation = useNavigation();
  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();

  
  // Destination Dropdown States
  const [destinationModalVisible, setDestinationModalVisible] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState("Select Destination");
  const [searchText, setSearchText] = useState(""); // Search input state

  // List of destinations
  const destinations = [
    "New York", "London", "Tokyo", "Paris", "Dubai", "Singapore", "Rome", "Bangkok", "Sydney"
  ];

  // Filter destinations based on search input
  const filteredDestinations = destinations.filter((destination) =>
    destination.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelectDestination = (destination) => {
    setSelectedDestination(destination);
    setValue("destination", destination); // Set value in react-hook-form
    setDestinationModalVisible(false);
    setSearchText(""); // Reset search text
  };

  const currentTheme = theme === "dark" ? darkTheme : lightTheme;
  const isTablet = width >= 768;

  const onSubmit = async (data) => {
    console.log("Selected Destination:", data);
    navigation.navigate('BoardingTime');

    await dispatch(setReligion(data.destination))
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
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
          <View style={styles.svgContainer}>
              <Ellipse1 width={isTablet ? 15 : 7} height={isTablet ? 15 : 7} style={styles.svgItem} />
              <Ellipse2 width={isTablet ? 30 : 15} height={isTablet ? 28 : 14} style={styles.svgItem} />
              <Ellipse3 width={isTablet ? 45 : 22} height={isTablet ? 45 : 22} style={styles.svgItem} />
              <Ellipse4 width={isTablet ? 60 : 30} height={isTablet ? 58 : 29} />
              <LotusYoga width={isTablet ? 150 : 100} height={isTablet ? 250 : 171} style={styles.lotusIcon} />
            </View>
            
            {/* Destination Dropdown */}
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.dropdown} onPress={() => setDestinationModalVisible(true)}>
                <Text style={styles.dropdownText}>{selectedDestination}</Text>
              </TouchableOpacity>
            </View>

            {/* Destination Modal with Search */}
            <Modal transparent={true} visible={destinationModalVisible} animationType="fade">
              <TouchableOpacity style={styles.modalOverlay} onPress={() => setDestinationModalVisible(false)}>
                <View style={styles.modalContainer}>
                  
                  {/* Search Bar */}
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search Destination..."
                    placeholderTextColor="#888"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                  />

                  {/* Destination List */}
                  <FlatList
                    data={filteredDestinations}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity style={styles.option} onPress={() => handleSelectDestination(item)}>
                        <Text style={styles.optionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={<Text style={styles.noResults}>No destinations found</Text>}
                  />
                </View>
              </TouchableOpacity>
            </Modal>

            {/* Submit Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: currentTheme.buttonBackground }]}
              onPress={handleSubmit(onSubmit)}
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
  dropdown: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  noResults: {
    padding: 12,
    textAlign: "center",
    color: "#888",
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

export default Destination;
