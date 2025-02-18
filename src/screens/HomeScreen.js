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

const Home = () => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boardingTime, setBoardingTime] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [name, setName] = useState("");
  const [isLandscape, setIsLandscape] = useState(width > height);

  const flatListRef = useRef(null);

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
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
    </View>
  );

  const handleLayoutChange = () => {
    setIsLandscape(width > height);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleLayoutChange);
    return () => {
      Dimensions.removeEventListener('change', handleLayoutChange);
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

        {/* Pagination Dots */}
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
          <View style={styles.exploreCard}>
            <Text style={styles.cardTitle}>Yoga Classes</Text>
            <Text style={styles.cardDescription}>Join live or recorded yoga sessions.</Text>
          </View>
          <View style={styles.exploreCard}>
            <Text style={styles.cardTitle}>Meditation</Text>
            <Text style={styles.cardDescription}>Relax with guided meditations.</Text>
          </View>
          <View style={styles.exploreCard}>
            <Text style={styles.cardTitle}>Healthy Living</Text>
            <Text style={styles.cardDescription}>Tips for a healthier lifestyle.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 70,
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  cardRowLandscape: {
    flexDirection: "column",
  },
  welcomeCard: {
    width: width * 0.46,
    backgroundColor: "#675987",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginRight: 8,
  },
  welcomeCard2: {
    width: width * 0.46,
    backgroundColor: "#595b6d",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  hidden: {
    display: "none",
  },
  rightSidebar: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#f4f4f4",
    width: width * 0.3,
    height: height,
    padding: 20,
  },
  newsContainer: {
    marginTop: 30,
  },
  newsCard: {
    backgroundColor: "#F4F4F4",
    borderRadius: 8,
    padding: 10,
    margin: 10,
    width: width * 0.85,
    marginBottom: 20,
  },
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  newsDescription: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    margin: 5,
  },
  activeDot: {
    backgroundColor: "#ff5a00",
  },
  scrollImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  exploreSection: {
    marginTop: 30,
    marginHorizontal: 20,
  },
  exploreText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  exploreCard: {
    width: "30%",
    backgroundColor: "#675987",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  cardDescription: {
    fontSize: 12,
    color: "white",
  },
});

export default Home;