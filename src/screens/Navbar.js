import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";
import UserProfileIcon from "../assets/userProfile.png";

const Navbar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedNav, setSelectedNav] = useState(route.name);

  useEffect(() => {
    const unsubscribe = navigation.addListener("state", () => {
      setSelectedNav(route.name);
    });

    return unsubscribe;
  }, [navigation, route.name]);

  return (
    <View style={styles.header}>
      {/* Lotus Icon - Left */}
      <LotusYoga height={40} width={40} />

      {/* User Profile Icon - Right */}
      <TouchableOpacity>
        <Image source={UserProfileIcon} style={styles.profileIcon} />
      </TouchableOpacity>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 20, // Adjust padding instead of negative values
    paddingVertical: 10,
    height: 60, // Increased height for a header feel
    width: width, // Ensures it takes full screen width
    position: "absolute", // Fixes it at the top
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "space-between", // Keeps icons at the edges
    elevation: 5, // Shadow for Android
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default Navbar;
