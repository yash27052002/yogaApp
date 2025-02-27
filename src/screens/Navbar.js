import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Dimensions, Text, Modal, TouchableWithoutFeedback, TextInput } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";
import UserProfileIcon from "../assets/userProfile.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Searchaltsvgrepocom from "../assets/searchSvg.svg";
import Orientation from 'react-native-orientation-locker';

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedNav, setSelectedNav] = useState(route.name);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setSelectedNav(route.name);
    });

    return unsubscribe;
  }, [navigation, route.name]);

  useEffect(() => {
    // Lock orientation when dropdown is visible, but prevent interference with modal
    if (dropdownVisible) {
      Orientation.lockToPortrait();
    } else {
      Orientation.unlockAllOrientations();
    }

    return () => {
      Orientation.unlockAllOrientations(); // Ensure orientation is unlocked on unmount or when dropdown is hidden
    };
  }, [dropdownVisible]);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userStatus');
      setDropdownVisible(false); // Close dropdown
    } catch (error) {
      console.error("Error clearing async storage", error);
    }
  };

  const toggleSearchBar = () => {
    setSearchBarVisible(!searchBarVisible);
  };

  return (
    <View style={styles.header}>
      {/* Lotus Icon - Left */}
      <LotusYoga height={40} width={40} />

      {/* Search Bar (visible on tablet or toggled on mobile) */}
      {(isTablet || searchBarVisible) && (
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchText}
            placeholder="What are you looking for?"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={searchBarVisible} // Focus the input when the search bar is visible
          />
        </View>
      )}

      {/* Search Icon (only visible on mobile, toggles the search bar) */}
      {!isTablet && (
        <TouchableOpacity onPress={toggleSearchBar} style={styles.searchIconContainer}>
          <Searchaltsvgrepocom style={styles.searchIconMobile} width={25} height={25} />
        </TouchableOpacity>
      )}

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
            <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
              <Text style={styles.dropdownText}>Settings</Text>
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

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    height: 60,
    width: "100%",
    justifyContent: "space-between",
    elevation: 5,
    position: "relative",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownMenu: {
    position: "absolute",
    right: 20,
    top: 60,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 10,
    padding: 10,
    width: 150,
  },
  dropdownText: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f1f1",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    flex: 1,
    justifyContent: 'center',
    marginLeft: 20,
  },
  searchText: {
    flex: 1,
    fontSize: 14,
    color: "#666",
  },
  searchIconContainer: {
    marginLeft: 10,
  },
  searchIconMobile: {
    marginLeft: 0,
  },
});

export default Navbar;
