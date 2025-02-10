import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

const Coaches = () => {
    const coaches = [
        { id: 1, name: 'Coach 1', image: require('../assets/profilepic1.jpg') },
        { id: 2, name: 'Coach 2', image: require('../assets/profilepic1.jpg') },
        { id: 3, name: 'Coach 3', image: require('../assets/profilepic3.png') },
        { id: 4, name: 'Coach 4', image: require('../assets/profilepic4.png') },
        { id: 5, name: 'Coach 5', image: require('../assets/profilepic3.png') },
    ];

    return (
        <SafeAreaView style={styles.container}>
            {/* Scrollable image at the top */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                <Image source={require('../assets/slide2.png')} style={styles.bannerImage} />
            </ScrollView>

            {/* Coaches Section */}
            <ScrollView style={styles.coachesContainer}>

                {/* Profile cards */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.cardsContainer}>
                    {coaches.map((coach) => (
                        <View key={coach.id} style={styles.card}>
                            <Image source={coach.image} style={styles.profileImage} />
                            <Text style={styles.coachName}>{coach.name}</Text>
                            <TouchableOpacity style={styles.button} onPress={() => console.log('Button Pressed')}>
                                <Text style={styles.buttonText}>Book slot</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    imageScroll: {
        width: '100%',
        height: 200, // Adjust height as needed
        marginTop: 20,
    },
    bannerImage: {
        width: 600,  // Width of the image (it will scroll horizontally)
        height: '50%',
        resizeMode: 'cover',
        borderRadius:20
    },
    coachesContainer: {
        flex: 1,
        padding: 20,
        marginTop: -190,  // Adds space between the banner and coaches section
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
        width: 120,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,  // Makes the image round
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
});

export default Coaches;
