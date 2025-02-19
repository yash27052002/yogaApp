import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');  // Get screen dimensions

const Coaches = () => {
    const navigation = useNavigation();

    const coaches = [
        { id: 1, name: 'Coach 1', image: require('../assets/profilepic1.jpg') },
        { id: 2, name: 'Coach 2', image: require('../assets/profilepic1.jpg') },
        { id: 3, name: 'Coach 3', image: require('../assets/profilepic3.png') },
        { id: 4, name: 'Coach 4', image: require('../assets/profilepic4.png') },
        { id: 5, name: 'Coach 5', image: require('../assets/profilepic3.png') },
        { id: 6, name: 'Coach 6', image: require('../assets/profilepic4.png') }, // New coach
    ];

    const handleCoachPress = (coach) => {
        navigation.navigate('CoachDetails', { coach }); // Navigate to CoachDetails and pass the selected coach
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>

                {/* Scrollable image at the top */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                    <Image source={require('../assets/slide2.png')} style={styles.bannerImage} />
                </ScrollView>

                {/* Coaches Section */}
                <View style={styles.coachesContainer}>
                    {/* Title */}
                    <Text style={styles.coachesTitle}>Coaches</Text>

                    {/* Profile cards */}
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsContainer}>
                        {coaches.map((coach) => (
                            <TouchableOpacity key={coach.id} onPress={() => handleCoachPress(coach)} style={styles.card}>
                                <Image source={coach.image} style={styles.profileImage} />
                                <Text style={styles.coachName}>{coach.name}</Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Book slot</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* New Card Section */}
                <View style={styles.newSection}>
                    <Text style={styles.coachesTitle}>New Coaches</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsContainer}>
                        {coaches.map((coach) => (
                            <TouchableOpacity key={coach.id} onPress={() => handleCoachPress(coach)} style={styles.card}>
                                <Image source={coach.image} style={styles.profileImage} />
                                <Text style={styles.coachName}>{coach.name}</Text>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Book slot</Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    imageScroll: {
        width: '100%',
        height: 200, // Adjust height as needed
        marginTop: 20,
    },
    bannerImage: {
        width: width,  // Full width of the screen
        height: '80%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    coachesContainer: {
        flex: 1,
        padding: 10,
        marginTop: -50,  // Adds space between the banner and coaches section
    },
    coachesTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    cardsContainer: {
        flexDirection: 'row',
    },
    card: {
        borderRadius: 10,
        padding: 10,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.3,  // Set card width to 30% of screen width
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    profileImage: {
        width: width * 0.2,  // Image width is 20% of screen width
        height: width * 0.2, // Image height is 20% of screen width
        borderRadius: width * 0.1,  // Makes the image round (half the width/height)
        marginBottom: 10,
    },
    coachName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    button: {
        backgroundColor: '#675987',
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 19,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    newSection: {
        marginTop: 30,  // Adds space before the new section
        paddingHorizontal: 10,
    }
});

export default Coaches;
