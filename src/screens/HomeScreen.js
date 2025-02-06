import * as React from "react";
import { Text, StyleSheet, View, Image, Dimensions, TouchableOpacity, ScrollView } from "react-native";
import { useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Home = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 778; // Adjust breakpoint as needed
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <ScrollView style={styles.frameParent}>
      {/* Header Section */}
      <View style={[styles.frameGroup, styles.frameGroupSpaceBlock]}>
        {isMobile && (
          <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        )}
        <View style={[styles.homeWrapper, styles.frameWrapperFlexBox]}>
          <Text style={[styles.home, styles.homeTypo]}>{`Home `}</Text>
        </View>
            <View style={[styles.categoriesWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.categories, styles.categoriesTypo]}>Categories</Text>
            </View>
            <View style={[styles.categoriesWrapper, styles.wrapperFlexBox]}>
              <Text style={[styles.categories, styles.categoriesTypo]}>Coaches</Text>
            </View>
      </View>
      {/* Side Panel for Mobile */}
      {isMobile && isMenuOpen && (
        <View style={styles.mobileSidePanel}>
          {/* Countdown Timer UI */}
          <View style={styles.time1Parent}>
            <View style={styles.time1}>
              <Text style={[styles.city, styles.cityClr]}>Your flight in</Text>
              <Text style={[styles.time, styles.cityClr]}>00:12:54</Text>
            </View>
          </View>

        </View>
      )}

      {/* Main Content */}
      <View style={styles.mainContent}>
        <Text style={[styles.welcome, styles.welcomePosition]}>Welcome,</Text>
        <Text style={[styles.jeshwant, styles.storiesTypo]}>Jeshwant</Text>
        <Text style={[styles.beginYourJourney, styles.homeTypo]}>Begin your journey here</Text>

        {/* Image Section */}
        <View style={[styles.exploreParent, isMobile && styles.mobileImageSection]}>
          <Text style={[styles.explore, styles.storiesTypo]}>Explore</Text>
          <View style={[styles.frameParent1, styles.frameWrapperFlexBox]}>
            {[1, 2, 3, 4].map((item, index) => (
              <View key={index} style={styles.imageParent}>
                <Image
                  style={[styles.imageIcon, styles.iconLayout]}
                  resizeMode="cover"
                  source={{ uri: "https://via.placeholder.com/150" }} // Replace with your image URL
                />
                <View style={styles.storiesOfShivaParent}>
                  <Text style={[styles.storiesOfShiva, styles.storiesTypo]}>Stories of Shiva</Text>
                  <Text style={[styles.byAravindh, styles.day1Typo]}>by Aravindh</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Gradient Section */}
        <LinearGradient
          style={[styles.frameLineargradient, styles.imageIcon4Layout]}
          locations={[0, 1]}
          colors={["#999", "rgba(255, 255, 255, 0)"]}
          useAngle={true}
          angle={90}
        >
          <Image
            style={[styles.imageIcon4, styles.cityPosition]}
            resizeMode="cover"
            source={{ uri: "https://via.placeholder.com/736x192" }} // Replace with your image URL
          />
          <View style={[styles.day1Wrapper, styles.day1WrapperPosition]}>
            <Text style={[styles.day1, styles.day1Typo]}>Day 1</Text>
          </View>
          <Text style={[styles.theBeginningOf, styles.day1WrapperPosition]}>
            The beginning of your journey
          </Text>
        </LinearGradient>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  frameGroupSpaceBlock: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    height:50,
    width:300
  },
  time1Parent: {
    borderRadius: 15,
    backgroundColor: "#675987",
    flex: 1,
    width: "100%",
    height: 89,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  time1: {
    height: 62,
    width: 142,
  },
  frameWrapperFlexBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  homeTypo: {
    color: "#000",
    textAlign: "left",
    fontFamily: "Manrope-Regular",
    fontSize:15
  },
  wrapperFlexBox: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  categoriesTypo: {
    fontFamily: "Manrope-Regular",
    color: "#fff",
    fontSize:15

  },
  welcomePosition: {
    top: 122,
    position: "absolute",
  },
  storiesTypo: {
    fontFamily: "Vardena",
    textAlign: "left",
    color: "#000",
    
  },
  iconLayout: {
    maxWidth: "100%",
    alignSelf: "stretch",
    overflow: "hidden",
    width: "100%",
  },
  day1Typo: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Manrope-Regular",
  },
  imageIcon4Layout: {
    height: 192,
    width: "100%",
    borderRadius: 15,
  },
  cityPosition: {
    top: 0,
    position: "absolute",
  },
  day1WrapperPosition: {
    left: 22,
    position: "absolute",
  },
  home: {
    textAlign: "left",
    fontSize: 20,
  },
  homeWrapper: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  categories: {
    color: "#fff",
    textAlign: "left",
    fontSize: 20,
  },
  categoriesWrapper: {
    padding: 10,
  },
  frameGroup: {
    marginLeft: -179,
    top: 31,
    left: "50%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: 358,
    backgroundColor: "#675987",
    borderRadius: 25,
    position: "absolute",
  },
  welcome: {
    left: 40,
    textAlign: "left",
    color: "#000",
    fontFamily: "Manrope-Regular",
    fontSize: 20,
  },
  jeshwant: {
    top: 147,
    fontSize: 32,
    left: 40,
    position: "absolute",
  },
  beginYourJourney: {
    top: 198,
    left: 40,
    textAlign: "left",
    fontSize: 20,
    position: "absolute",
  },
  explore: {
    fontSize: 24,
    alignSelf: "stretch",
  },
  imageIcon: {
    height: 169,
  },
  storiesOfShiva: {
    alignSelf: "stretch",
    fontSize: 20,
  },
  byAravindh: {
    color: "#777",
    alignSelf: "stretch",
  },
  storiesOfShivaParent: {
    width: 144,
    gap: 5,
    alignItems: "center",
  },
  imageParent: {
    width: 169,
    gap: 13,
    alignItems: "center",
  },
  frameParent1: {
    gap: 15,
    alignSelf: "stretch",
    alignItems: "center",
  },
  exploreParent: {
    top: 435,
    width: "90%",
    gap: 19,
    left: 40,
    position: "absolute",
  },
  mobileImageSection: {
    width: "100%",
    left: 0,
    paddingHorizontal: 20,
  },
  day1: {
    color: "#fff",
  },
  day1Wrapper: {
    top: 22,
    backgroundColor: "#000",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  theBeginningOf: {
    top: 50,
    fontSize: 12,
    fontFamily: "Inter-Regular",
    color: "#fff",
    textAlign: "left",
  },
  frameLineargradient: {
    top: 223,
    backgroundColor: "transparent",
    left: 40,
    position: "absolute",
  },
  mainContent: {
    flex: 1,
    paddingTop: 100,
  },
  mobileSidePanel: {
    position: "absolute",
    top: 80,
    left: 0,
    width: "50%",
    backgroundColor: "#675987",
    padding: 10,
    zIndex: 1,
  },
  menuButton: {
    padding: 10,
  },
  menuIcon: {
    fontSize: 24,
    color: "#fff",
  },
  frameParent: {
    flex: 1,
    height: "100%",
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#fff",
  },
});

export default Home;
