import React, { useState, useRef } from "react";
import { 
  Text, StyleSheet, View, TouchableOpacity, FlatList, Dimensions, Image, ScrollView 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Navbar from "./Navbar";

const { width } = Dimensions.get("window");

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
  const flatListRef = useRef(null);

  const handleScroll = (event) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / (width * 0.9)); // Adjust index based on card width
    setCurrentIndex(index);
  };

  const renderNewsItem = ({ item }) => (
    <View style={styles.newsCard}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* News Section */}
      <View style={styles.newsContainer}>
        <FlatList
          ref={flatListRef}
          data={newsData}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id}
          snapToInterval={width * 0.9} // Ensures cards snap to the correct position
          decelerationRate="fast"
        />

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {newsData.map((_, index) => (
            <View key={index} style={[styles.dot, currentIndex === index && styles.activeDot]} />
          ))}
        </View>
      </View>

      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.welcome}>Welcome,</Text>
        <Text style={styles.username}>Jeshwant</Text>
        <Text style={styles.journeyText}>Begin your journey here</Text>
      </View>

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
  newsContainer: {
    alignItems: "center",
    marginTop: 20,
    height: 240,
  },
  newsCard: {
    width: width * 0.9, // Adjusted width for better fit
    height: width * 0.5, // Adjust the height to avoid cut-off
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 10,
    elevation: 15,
    justifyContent: 'center', // Ensures content is centered within the card

    // iOS shadow properties
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 }, // Slight shadow below
    shadowOpacity: 0.9, // Soft shadow intensity
    shadowRadius: 5, // Softens the shadow

    // Android shadow properties
    elevation: 10, // Elevation for shadow below on Android
  },
  
  newsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 14,
    color: "#666",
  },
  pagination: {
    flexDirection: "row",
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#007AFF",
  },
  welcomeSection: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
  },
  journeyText: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  imageSection: {
    marginTop: 20,
    alignItems: "center",
  },
  scrollImage: {
    width: width * 0.9,
    height: 200,
    borderRadius: 15,
    marginBottom: 20,
  },
  exploreSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  exploreText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  exploreCard: {
    width: width * 0.28,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
});

export default Home;
