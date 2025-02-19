import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Navbar from './Navbar';

const Settings = () => {
    const [isLandscape, setIsLandscape] = useState(false); // Track the device orientation
    const { width, height } = Dimensions.get("window");

    useEffect(() => {
        const updateOrientation = () => {
            setIsLandscape(width > height);
        };

        // Using 'addEventListener' and 'remove' instead of removeEventListener
        const subscription = Dimensions.addEventListener('change', updateOrientation);
        updateOrientation(); // Initial check

        return () => {
            subscription?.remove(); // Cleanup using 'remove'
        };
    }, [width, height]);

    return (
        <View style={{ flex: 1 }}>
            <Navbar />
            <ScrollView contentContainerStyle={[styles.container, isLandscape && styles.landscapeContainer]}>
                <View style={[styles.profileSection, isLandscape && styles.landscapeProfileSection]}>
                    <Image 
                        source={{ uri: 'https://example.com/path-to-your-profile-image.jpg' }} // Update with actual image path
                        style={styles.profileImage} 
                    />
                </View>

                {/* Cards */}
                <View style={styles.cardContainer}>
                    <TouchableOpacity style={[styles.card, isLandscape && styles.landscapeCard]}>
                        <Text style={styles.cardText}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card, isLandscape && styles.landscapeCard]}>
                        <Text style={styles.cardText}>Subscription</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.card, isLandscape && styles.landscapeCard]}>
                        <Text style={styles.cardText}>Progress</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    landscapeContainer: {
        justifyContent: 'center', // Center content when in landscape mode
        alignItems: 'center', // Align content in the center of the screen
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 20,
    },
    landscapeProfileSection: {
        marginBottom: 10, // Adjust margin for better positioning in landscape mode
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#ccc',
    },
    cardContainer: {
        marginTop: 20,
        width: '100%',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginBottom: 15,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3, // For Android
        width: '100%', // Default width for portrait mode
    },
    landscapeCard: {
        width: '80%', // Shrink the card width in landscape mode
    },
    cardText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default Settings;
