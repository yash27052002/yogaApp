import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from './screens/MainLayout';
import VideoPlayer from './screens/VideoPlayer';

const Tab = createBottomTabNavigator();
const { width, height } = Dimensions.get('window');

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const randomCode = await AsyncStorage.getItem('randomCode');
        if (randomCode) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking random code', error);
      }
    };

    checkAuthentication();

    const intervalId = setInterval(checkAuthentication, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isAuthenticated ? (
              <>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Religion" component={Religion} />
                <Stack.Screen name="Destination" component={Destination} />
                <Stack.Screen name="BoardingTime" component={BoardingTime} />
                <Stack.Screen name="Preferance" component={Preferance} />
                <Stack.Screen name="Loading" component={Loading} />
                <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

const HomeTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: styles.tabBar,
      tabBarLabelStyle: styles.tabBarLabel,
      tabBarActiveTintColor: "#000", // Active text color
      tabBarInactiveTintColor: "#fff", // Inactive text color
      tabBarIcon: () => null, // Remove icons
      tabBarButton: (props) => {
        const isFocused = props.accessibilityState?.selected;
        return (
          <View style={[styles.tabButtonContainer, isFocused && styles.activeTab]}>
            <TouchableOpacity {...props} style={styles.tabButton} />
          </View>
        );
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreenWrapper} />
    <Tab.Screen name="Categories" component={CategoriesWrapper} />
    <Tab.Screen name="Coaches" component={CoachesWrapper} />
  </Tab.Navigator>
);

const HomeScreenWrapper = ({ navigation, route }) => (
  <MainLayout>
    <HomeScreen navigation={navigation} route={route} />
  </MainLayout>
);

const CategoriesWrapper = ({ navigation, route }) => (
  <MainLayout>
    <Categories navigation={navigation} route={route} />
  </MainLayout>
);

const CoachesWrapper = ({ navigation, route }) => (
  <MainLayout>
    <Coaches navigation={navigation} route={route} />
  </MainLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    backgroundColor: "#675987",
    height: 50, // Adjust the height for better visibility
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row', // Ensure tabs are arranged in a row
    justifyContent: 'space-around', // Distribute space evenly
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20, // Adjusted margin for better alignment
  },
  tabButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    overflow: "hidden",
    paddingVertical: 5, // Adjust padding for better space distribution
  },
  activeTab: {
    backgroundColor: "#fff",
    borderRadius: 80,
    padding: 10,
  },
  tabButton: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
