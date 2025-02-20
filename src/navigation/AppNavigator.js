import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import OtpScreen from '../screens/login/OtpScreen';
import Religion from '../screens/register/Religion';
import Destination from '../screens/Destination';
import BoardingTime from '../screens/BoardingTime';
import Preferance from '../screens/Preferance';
import Loading from '../screens/Loading';
import Coaches from '../screens/Coaches';
import Categories from '../screens/Categories';
import Navbar from '../screens/Navbar';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <View style={styles.container}>
      {/* Navbar stays fixed at the top */}
      <Navbar />

      {/* Stack Navigator fills the rest of the space */}
      <View style={styles.stackContainer}>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} />
          <Stack.Screen name="Religion" component={Religion} />
          <Stack.Screen name="Destination" component={Destination} />
          <Stack.Screen name="BoardingTime" component={BoardingTime} />
          <Stack.Screen name="Preferance" component={Preferance} />
          <Stack.Screen name="Loading" component={Loading} />
          <Stack.Screen name="Coaches" component={Coaches} />
          <Stack.Screen name="Categories" component={Categories} />
        </Stack.Navigator>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up the entire screen
  },
  stackContainer: {
    flex: 1, // Ensures the stack navigator fills the remaining space
  },
});
