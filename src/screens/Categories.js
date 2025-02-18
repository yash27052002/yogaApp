import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, useWindowDimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Categories = () => {
    const { width } = useWindowDimensions();
    const isTablet = width >= 778 && width < 1024;  // Tablet size
    const isDesktop = width >= 1024;  // Desktop size
    const navigation = useNavigation(); // Initialize useNavigation hook

    // Different content for each section
    const sectionContent = {
        "From the Mentors": [
            { id: 1, title: "Hanuman’s way by Aravindh", image: require('../assets/hanuman.png'), videoUrl: 'https://path/to/video1' },
            { id: 2, title: "Card 2", image: require('../assets/godworld.png'), videoUrl: 'https://path/to/video2' },
            { id: 3, title: "Card 3", image: require('../assets/reading.png'), videoUrl: 'https://path/to/video3' },
            { id: 4, title: "Card 4", image: require('../assets/mahabarath.png'), videoUrl: 'https://path/to/video4' },
            { id: 5, title: "Card 5", image: require('../assets/ram.png'), videoUrl: 'https://path/to/video5' },
        ],
        "From Purnam": [
            { id: 1, title: "Card A", image: require('../assets/universe.png'), videoUrl: 'https://path/to/videoA' },
            { id: 2, title: "Card B", image: require('../assets/siva.png'), videoUrl: 'https://path/to/videoB' },
            { id: 3, title: "Card C", image: require('../assets/siva2.png'), videoUrl: 'https://path/to/videoC' },
            { id: 4, title: "Card D", image: require('../assets/vishnu.png'), videoUrl: 'https://path/to/videoD' },
            { id: 5, title: "Card E", image: require('../assets/saints.png'), videoUrl: 'https://path/to/videoE' },
        ],
    };

    const handleCardPress = (videoUrl) => {
        // Navigate to VideoPlayerScreen and pass video URL
        navigation.navigate('VideoPlayer');
    };

    const renderCard = (card) => (
        <TouchableOpacity key={card.id} style={styles.card} onPress={() => handleCardPress(card.videoUrl)}>
            <Image source={card.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{card.title}</Text> {/* Ensuring this is wrapped in Text */}
        </TouchableOpacity>
    );

    const renderSection = (title, content) => (
        <View key={title} style={styles.section}>
            <Text style={[styles.sectionTitle, isTablet && styles.sectionTitleTablet]}>
                {title} {/* Ensuring section title is wrapped in Text */}
            </Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                style={styles.cardContainer}
                contentContainerStyle={styles.cardContent}
            >
                {content.map(renderCard)}
            </ScrollView>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={styles.container}> {/* Root ScrollView */}
            {Object.entries(sectionContent).map(([sectionTitle, content]) =>
                renderSection(sectionTitle, content)
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    sectionTitleTablet: {
        fontSize: 24,  // Larger font size for tablet and desktop
    },
    cardContainer: {
        flexDirection: 'row',
    },
    cardContent: {
        alignItems: 'center',
    },
    card: {
        borderRadius: 8,
        padding: 10,
        marginRight: 15,
        width: 150,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    cardImage: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
});

export default Categories;
