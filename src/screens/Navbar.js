import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, Text, Modal, TouchableWithoutFeedback } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";
import UserProfileIcon from "../assets/userProfile.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const [selectedNav, setSelectedNav] = useState(route.name);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to manage dropdown visibility

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setSelectedNav(route.name);
    });

    return unsubscribe;
  }, [navigation, route.name]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('randomCode'); // Clear AsyncStorage
      setDropdownVisible(false); // Close dropdown
    } catch (error) {
      console.error("Error clearing async storage", error);
    }
  };

  return (
    <View style={styles.header}>
      {/* Lotus Icon - Left */}
      <LotusYoga height={40} width={40} />

      {/* User Profile Icon - Right */}
      <TouchableOpacity onPress={() => setDropdownVisible(!dropdownVisible)}>
        <Image source={UserProfileIcon} style={styles.profileIcon} />
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {dropdownVisible && (
        <Modal transparent={true} animationType="fade" visible={dropdownVisible}>
          <TouchableWithoutFeedback onPress={() => setDropdownVisible(false)}>
            <View style={styles.modalBackdrop} />
          </TouchableWithoutFeedback>

          <View style={styles.dropdownMenu}>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
              <Text style={styles.dropdownText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.dropdownText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 60,
    width: width,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between",
    elevation: 5,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for the modal
  },
  dropdownMenu: {
    position: "absolute",
    right: 20,
    top: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 10, // Shadow effect
    padding: 10,
    width: 150,
  },
  dropdownText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
});

export default Navbar;
