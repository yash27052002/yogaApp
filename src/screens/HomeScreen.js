import React, { useEffect, useRef } from "react";
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, Animated } from "react-native";
import { useWindowDimensions } from "react-native";
import LotusYoga from "../assets/lotus-yoga_svgrepo.com.svg";
import { useNavigation } from '@react-navigation/native';
import Navbar from './Navbar';

const Home = () => {
  const { width } = useWindowDimensions();
  const isMobile = width < 778; 
  const [selectedNav, setSelectedNav] = React.useState('Home'); 

  const navigation = useNavigation();
  const handleNavClick = (section) => {
    setSelectedNav(section);
    navigation.navigate(section);
  };

  // Auto-scrolling setup
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const scroll = () => {
      Animated.timing(scrollX, {
        toValue: 1000, // Adjust based on text length
        duration: 15000, // Adjust scrolling speed
        useNativeDriver: true,
      }).start(() => {
        scrollX.setValue(0); // Reset scroll after completion
        scroll(); // Restart scrolling
      });
    };
    scroll();
  }, []);

  return (
    <ScrollView style={styles.frameParent}>

      {/* Auto Scrolling Text in a Card */}
      <View style={styles.cardContainer}>
        <Animated.ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          style={{ transform: [{ translateX: scrollX }] }}
        >
          <Text style={styles.autoScrollText}>
          The Big Take 
          Elon Musk Sounds Odd on Recession Risk, Twitter Deal and Trump          </Text>
          <Text style={styles.autoScrollText}>
            Curabitur volutpat libero sit amet ligula aliquet, ac tempor dui posuere. Duis tincidunt sit amet orci at tempor. 
          </Text>
          <Text style={styles.autoScrollText}>
            Praesent et lectus ac magna tincidunt suscipit ut in nulla. Suspendisse potenti. Phasellus ac vestibulum ante, eget facilisis lorem.
          </Text>
        </Animated.ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  lotusIcon: {
    width: 40,
    height: 50,
    position: 'absolute',
    left: -60,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: "#675987",
    borderRadius: 29,
    marginTop: 20,
    paddingLeft: 60,
    position: 'relative',
    height: 50,
    marginLeft: 50,
    width: 280,
    justifyContent: 'space-between',
  },
  navContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    width: '70%',
    marginLeft: -30,
  },
  navItem: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  selectedNavItem: {
    backgroundColor: '#fff',
    borderRadius: 19,
  },
  navText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedNavText: {
    color: '#000',
  },
  cardContainer: {
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: "hidden",
  },
  scrollContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  autoScrollText: {
    fontSize: 16,
    paddingHorizontal: 10,
    color: "#333",
    width: 300,
  },
});

export default Home;
