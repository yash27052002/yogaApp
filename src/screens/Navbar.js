import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, useWindowDimensions } from "react-native";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";
import { useNavigation, useRoute } from "@react-navigation/native";

const Navbar = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 778;  // Mobile size
  const isTablet = width >= 778 && width < 1024;  // Tablet size
  const navigation = useNavigation();
  const route = useRoute();

  const [selectedNav, setSelectedNav] = useState(route.name);

  // Listen for changes in the navigation route
  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      setSelectedNav(route.name);  // Update selectedNav immediately on route change
    });

    return unsubscribe;  // Clean up the listener on component unmount
  }, [navigation, route.name]);

  const handleNavClick = (section) => {
    setSelectedNav(section);  // Immediately set the selected nav item
    navigation.navigate(section);  // Navigate to the selected section
  };

  return (
    <View style={styles.header}>
      {/* Lotus Icon */}
      <LotusYoga
        height={isMobile ? 30 : 40}
        style={styles.lotusIcon}
      />

      {/* Navbar Items */}
      <View
        style={[
          styles.navContainer,
          isTablet && styles.navContainerTablet, // Adjust navbar for tablets or landscape
        ]}
      >
        {['Home', 'Categories', 'Coaches'].map((section) => (
          <TouchableOpacity
            key={section}
            onPress={() => handleNavClick(section)}
            style={[
              styles.navItem,
              selectedNav === section && styles.selectedNavItem, // Highlight selected nav item
            ]}
          >
            <Text style={[styles.navText, selectedNav === section && styles.selectedNavText]}>
              {section}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lotusIcon: {
    width: 40,
    height: 50,
    position: "absolute",  // Positioned absolute to keep it in the left corner
    left: -115,
    marginTop: -5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#675987",
    borderRadius: 29,
    marginTop: 20,
    paddingLeft: 50,
    position: "relative",
    height: 50,
    marginLeft: 40,
    width: 280,
    justifyContent: "flex-start", // Default alignment: left for lotus icon
  },
  navContainer: {
    flexDirection: "row",
    justifyContent: "center",  // Center navbar items on mobile
    flex: 1,
    marginLeft: -30,  // Adjust space for larger screens
  },
  navContainerTablet: {
    justifyContent: "center",  // Center navbar for tablets
    marginLeft: 0,  // No margin for tablet views
    width: "100%",  // Make sure it spans the whole screen width
  },
  navItem: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  selectedNavItem: {
    backgroundColor: "#fff",
    borderRadius: 19,
  },
  navText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff",
  },
  selectedNavText: {
    color: "#000",
  },
});

export default Navbar;
