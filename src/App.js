import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Stack Navigator
import { Provider } from 'react-redux';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import OtpScreen from './screens/OtpScreen';
import Religion from './screens/Religion';
import Destination from './screens/Destination';
import BoardingTime from './screens/BoardingTime';
import Preferance from './screens/Preferance';
import Loading from './screens/Loading';
import Coaches from './screens/Coaches';
import Categories from './screens/Categories';
import Navbar from './screens/Navbar';
import store from './redux/Store';

const Stack = createStackNavigator(); // Create Stack Navigator

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true); 

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          {isAuthenticated ? (
            // If authenticated, show the StackNavigator with Navbar as static header
            <Stack.Navigator
              initialRouteName="Home"
              screenOptions={{
                headerShown: false, // Hide default header for all screens
                animationEnabled: true, // Enable transitions
                gestureEnabled: false, // Enable gestures for transitions
                cardStyleInterpolator: ({ current, next, layouts }) => {
                  return {
                    cardStyle: {
                      opacity: current.progress, // Opacity fade effect
                    },
                  };
                },
              }}
            >
              <Stack.Screen name="Home" component={HomeScreenWrapper} />
              <Stack.Screen name="Categories" component={CategoriesWrapper} />
              <Stack.Screen name="Coaches" component={CoachesWrapper} />
            </Stack.Navigator>
          ) : (
            // If not authenticated, show the login flow
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="OtpScreen" component={OtpScreen} />
              <Stack.Screen name="Religion" component={Religion} />
              <Stack.Screen name="Destination" component={Destination} />
              <Stack.Screen name="BoardingTime" component={BoardingTime} />
              <Stack.Screen name="Preferance" component={Preferance} />
              <Stack.Screen name="Loading" component={Loading} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

// Wrapping screen components to include Navbar
const HomeScreenWrapper = () => (
  <View style={styles.container}>
    <Navbar />
    <HomeScreen />
  </View>
);

const CategoriesWrapper = () => (
  <View style={styles.container}>
    <Navbar />
    <Categories />
  </View>
);

const CoachesWrapper = () => (
  <View style={styles.container}>
    <Navbar />
    <Coaches />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
