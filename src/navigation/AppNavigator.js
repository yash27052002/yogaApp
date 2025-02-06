import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import OtpScreen from '../screens/OtpScreen';
import Religion from '../screens/Religion';
import Destination from '../screens/Destination';
import BoardingTime from '../screens/BoardingTime';
import Preferance from '../screens/Preferance';
import Loading from '../screens/Loading';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} // Hide header for Login screen
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} // Hide header for Register screen
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} // Hide header for Home screen
        />
        <Stack.Screen 
          name="OtpScreen" 
          component={OtpScreen} 
          options={{ headerShown: false }} // Hide header for Home screen
        />
        <Stack.Screen 
          name="Religion" 
          component={Religion} 
          options={{ headerShown: false }} // Hide header for Home screen
        />
        <Stack.Screen 
          name="Destination" 
          component={Destination} 
          options={{ headerShown: false }} // Hide header for Home screen
        />
        <Stack.Screen 
          name="BoardingTime" 
          component={BoardingTime} 
          options={{ headerShown: false }} // Hide header for Home screen
        />
        <Stack.Screen 
          name="Preferance" 
          component={Preferance} 
          options={{ headerShown: false }} // Hide header for Home screen
        />
        <Stack.Screen 
          name="Loading" 
          component={Loading} 
          options={{ headerShown: false }} // Hide header for Home screen
        />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
