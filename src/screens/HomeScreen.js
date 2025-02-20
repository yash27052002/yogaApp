import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, FlatList, Dimensions, Image, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

const newsData = [
  {
    id: "1",
    title: "Elon Musk on Recession Risk",
    description: "Elon Musk shares his views on the upcoming economic downturn and its global impact.",
  },
  {
    id: "2",
    title: "Tech Industry Layoffs",
    description: "Several tech companies are cutting jobs amid economic uncertainty. Here's what you need to know.",
  },
  {
    id: "3",
    title: "AI Takes Over Jobs?",
    description: "Experts weigh in on the impact of AI on job security across multiple industries.",
  },
];

const exploreData = [
  { id: 1, title: "Hanuman’s way by Aravindh", image: require('../assets/hanuman.png') },
  { id: 2, title: "Stories of Vishnu", image: require('../assets/godworld.png') },
  { id: 3, title: "The beginning", image: require('../assets/reading.png') },
  { id: 4, title: "Bahavath Geetha", image: require('../assets/mahabarath.png') },
  { id: 5, title: "Ramayana", image: require('../assets/ram.png') },
];

const Home = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boardingTime, setBoardingTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [name, setName] = useState("");
  const [isLandscape, setIsLandscape] = useState(width > height);
  const [windowWidth, setWindowWidth] = useState(width);
  const [windowHeight, setWindowHeight] = useState(height);

  const flatListRef = useRef(null);
useEffect(()=>{
  const dataAsync = async ()=>{
    const storedBoardingTime = await AsyncStorage.getItem("boardingTime");
    const userName = await AsyncStorage.getItem("userName");
  
    console.log(storedBoardingTime, userName)
    setBoardingTime(storedBoardingTime);
    setName(userName);
  };
  dataAsync();
}, [])


  useEffect(() => {
    const fetchBoardingTime = async () => {
      try {
        const storedBoardingTime = await AsyncStorage.getItem("boardingTime");
        const userName = await AsyncStorage.getItem("userName");

        if (storedBoardingTime) {
          const currentDate = new Date();
          const [time, period] = storedBoardingTime.split(" ");

          const [hours, minutes] = time.split(":").map(Number);
          let adjustedHours = hours;

          if (period.toUpperCase() === "PM" && hours !== 12) {
            adjustedHours = hours + 12;
          } else if (period.toUpperCase() === "AM" && hours === 12) {
            adjustedHours = 0;
          }

          const boardingTimeDate = new Date(
            currentDate.setHours(adjustedHours, minutes, 0, 0)
          );

          if (!isNaN(boardingTimeDate.getTime())) {
            setBoardingTime(boardingTimeDate);
            calculateTimeRemaining(boardingTimeDate);
          } else {
            console.error("Invalid boarding time value");
          }

          setName(userName);
        } else {
          console.log("No boarding time found");
        }
      } catch (error) {
        console.error("Error fetching boarding time:", error);
      }
    };

    fetchBoardingTime();

    const intervalId = setInterval(() => {
      if (boardingTime) {
        calculateTimeRemaining(boardingTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [boardingTime]);

  const calculateTimeRemaining = (boardingTimeDate) => {
    if (boardingTimeDate) {
      const currentTime = new Date();
      const timeDifference = boardingTimeDate - currentTime;

      if (timeDifference > 0) {
        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const paddedHours = String(hours).padStart(2, "0");
        const paddedMinutes = String(minutes).padStart(2, "0");
        const paddedSeconds = String(seconds).padStart(2, "0");

        setTimeRemaining(`${paddedHours}:${paddedMinutes}:${paddedSeconds}`);
      } else {
        setTimeRemaining("Boarding time has passed");
      }
    } else {
      setTimeRemaining("Loading...");
    }
  };

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width * 0.9));
    setCurrentIndex(index);
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsCardWrapper}>
      <View style={styles.newsCard}>
        <Text style={styles.newsTitle}>{item.title}</Text>
        <Text style={styles.newsDescription}>{item.description}</Text>
      </View>
    </View>
  );

  const handleLayoutChange = () => {
    setIsLandscape(width > height);
  };

  useEffect(() => {
    const onDimensionsChange = ({ window }) => {
      setWindowWidth(window.width);
      setWindowHeight(window.height);
    };

    const dimensionSubscription = Dimensions.addEventListener('change', onDimensionsChange);

    return () => {
      dimensionSubscription?.remove();
    };
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.welcomeSection}>
        <Text style={styles.welcome}>Welcome,</Text>
        <Text style={styles.username}>{name}</Text>
        <Text style={styles.journeyText}>Begin your journey here</Text>
      </View>

      {/* Card Row with Reduced Space */}
      <View style={[styles.cardRow, isLandscape && styles.cardRowLandscape]}>
        <View style={[styles.welcomeCard, isLandscape && styles.hidden]}>
          <Text style={styles.cardTitle}>Your flight in</Text>
          <Text style={styles.cardDescription}>
            {boardingTime ? timeRemaining : "Loading..."}
          </Text>
        </View>
        <View style={[styles.welcomeCard2, isLandscape && styles.hidden]}>
          <Text style={styles.cardTitle}>Today, +0HRS</Text>
          <Text style={styles.cardDescription}>28 °C     12:54PM</Text>
        </View>
      </View>

      {/* News Section */}
      <View style={[styles.newsContainer, isLandscape && styles.hidden]}>
        <FlatList
          ref={flatListRef}
          data={newsData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id}
          snapToInterval={width * 0.9}
          decelerationRate="fast"
        />

        <View style={styles.pagination}>
          {newsData.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
          ))}
        </View>
      </View>

      {/* Right Sidebar in Landscape Mode */}
      {isLandscape && (
        <View style={styles.rightSidebar}>
          <View style={styles.welcomeCard}>
            <Text style={styles.cardTitle}>Your flight in</Text>
            <Text style={styles.cardDescription}>
              {boardingTime ? timeRemaining : "Loading..."}
            </Text>
          </View>
          <View style={styles.welcomeCard2}>
            <Text style={styles.cardTitle}>Today, +0HRS</Text>
            <Text style={styles.cardDescription}>28 °C     12:54PM</Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={newsData}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            renderItem={renderNewsItem}
            keyExtractor={(item) => item.id}
            snapToInterval={width * 0.9}
            decelerationRate="fast"
          />
        </View>
      )}

      {/* Scrollable Image Section */}
      <View style={styles.imageSection}>
        <Image
          source={require('../assets/meditation.png')}
          style={styles.scrollImage}
        />
      </View>

      {/* Explore Section */}
      <View style={styles.exploreSection}>
        <Text style={styles.exploreText}>Explore</Text>
        <View style={styles.cardContainer}>
          {exploreData.map((item) => (
            <View key={item.id} style={styles.exploreCard}>
              <Image source={item.image} style={styles.cardImage} />
              <Text style={styles.cardTitle2}>{item.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  scrollViewContent: {
    paddingBottom: 30,
  },
  welcomeSection: {
    marginTop: 20,
    marginBottom: 10,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  username: {
    fontSize: 28,
    fontWeight: "600",
    color: "#000",
  },
  journeyText: {
    fontSize: 14,
    color: "#666",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  cardRowLandscape: {
    flexDirection: "column",
  },
  welcomeCard: {
    width: "48%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#675987",
  },
  welcomeCard2: {
    width: "48%",
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#051650",
  },

  cardTitle: {
    fontSize: 16,
    color: "#fff"
  },
  cardTitle2: {
    fontSize: 16,
    color: "#000"
  },
  cardDescription: {
    fontSize: 14,
    color: "#fff",
  },
  hidden: {
    display: "none",
  },
  newsCardWrapper: {
    flex: 1,
    marginBottom: 30,
    marginRight: 10,
    marginTop:20,
  },
  newsCard: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    backgroundColor: "#f4f4f4",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    height: 100,  // Adjust height to accommodate content, you may need to tweak
    maxWidth: width * 0.9,  // Ensure the card stays within the page width
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  newsDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
    flexWrap: "wrap", // Allow wrapping of text if needed
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  activeDot: {
    backgroundColor: "#0066cc",
  },
  rightSidebar: {
    flex: 1,
    justifyContent: "flex-start",
  },
  scrollImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
  },
  exploreSection: {
    marginTop: 30,
  },
  exploreText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  exploreCard: {
    width: "48%",
    padding: 10,
    backgroundColor: "#fafafa",
    marginBottom: 20,
    borderRadius: 8,
  },
  cardImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 8,
  },
});

export default Home;
