import React, { useState  } from 'react';
import { View, SafeAreaView, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Use Tab Navigator
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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


const Tab = createBottomTabNavigator(); // Create Tab Navigator
const { width } = Dimensions.get('window');

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const Stack = createNativeStackNavigator();


  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <NavigationContainer>
          {isAuthenticated ? (
            // If authenticated, show the TabNavigator with Navbar as static header
<Tab.Navigator
  screenOptions={({ route }) => ({
    headerShown: false,
    tabBarStyle: {
      backgroundColor: "#675987",
      height: 60,
      borderTopLeftRadius: 500,
      borderTopRightRadius: 500,
      position: "absolute",
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowRadius: 10,
      elevation: 5,
    },
    tabBarLabelStyle: {
      fontSize: 13,
      fontWeight: "bold",
      marginBottom: 10,
    },
    tabBarActiveTintColor: "#000",
    tabBarInactiveTintColor: "#fff",
    tabBarButton: (props) => {
      const isFocused = props.accessibilityState?.selected;
      return (
        <View style={[styles.tabButtonContainer, isFocused && styles.activeTab]}>
          <TouchableOpacity {...props} />
        </View>
      );
    },
  })}
>
  <Tab.Screen name="Home" component={HomeScreenWrapper} />
  <Tab.Screen name="Categories" component={CategoriesWrapper} />
  <Tab.Screen name="Coaches" component={CoachesWrapper} />
</Tab.Navigator>
          ) : (
            // If not authenticated, show the login flow
            <>
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
            </>
          )}
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
};

// Wrapping screen components to include Navbar
const HomeScreenWrapper = () => (
  <View style={styles.wrapperContainer}>
    <Navbar />
    <View style={styles.screenContainer}>
      <HomeScreen />
    </View>
  </View>
);

const CategoriesWrapper = () => (
  <View style={styles.wrapperContainer}>
    <Navbar />
    <View style={styles.screenContainer}>
      <Categories />
    </View>
  </View>
);

const CoachesWrapper = () => (
  <View style={styles.wrapperContainer}>
    <Navbar />
    <View style={styles.screenContainer}>
      <Coaches />
    </View>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  wrapperContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  screenContainer: {
    flex: 1,
    paddingTop: 60, // Adjust this value based on your Navbar height
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  tabButtonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 250, // Add border-radius
    overflow: "hidden",
  },
  activeTab: {
    backgroundColor: "#fff", // Active tab background color
    borderRadius: 250, // Rounded edges for the active tab
    padding: -10, // Padding for better look
  },
});

export default App;
