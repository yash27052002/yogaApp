import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
  Image,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screens/login/LoginScreen';
import RegisterScreen from './screens/register/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import OtpScreen from './screens/login/OtpScreen';
import Religion from './screens/register/Religion';
import Destination from './screens/register/Destination';
import BoardingTime from './screens/register/BoardingTime';
import Preference from './screens/register/Preference';
import Loading from './screens/Loading';
import Coaches from './screens/Coaches';
import Categories from './screens/Categories';
import Navbar from './screens/Navbar';
import store from './redux/Store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from './screens/MainLayout';
import VideoPlayer from './screens/VideoPlayer';
import Settings from './screens/Settings';
import CoachesDetails from './screens/CoachesDetails';

const Tab = createBottomTabNavigator();
const {width, height} = Dimensions.get('window');

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Stack = createNativeStackNavigator();
  const isLandscape = width > height; // Check for landscape mode

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userStatus = await AsyncStorage.getItem('userStatus');
        if (userStatus == 'true') {
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
          <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAuthenticated ? (
              <>
                <Stack.Screen name="HomeTabs" component={HomeTabs} />
                <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen
                  name="CoachesDetails"
                  component={CoachesDetails}
                />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="OtpScreen" component={OtpScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="Religion" component={Religion} />
                <Stack.Screen name="Destination" component={Destination} />
                <Stack.Screen name="BoardingTime" component={BoardingTime} />
                <Stack.Screen name="Preference" component={Preference} />
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

const HomeTabs = () => {
  const isLandscape = width > height; // Check for landscape mode

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: [styles.tabBar], // Adjust bottom position based on landscape mode
        tabBarShowLabel: false, // Hide default labels to use custom ones
        tabBarIcon: ({focused}) => {
          let iconSource;

          if (route.name === 'Home') {
            iconSource = require('./assets/home.png');
          } else if (route.name === 'Categories') {
            iconSource = require('./assets/category.png');
          } else if (route.name === 'Coaches') {
            iconSource = require('./assets/coaches.png');
          }

          return (
            <View style={[styles.tabContainer, {bottom: isLandscape ? 0 : 15}]}>
              <View
                style={[
                  styles.iconBackground,
                  focused && styles.activeIconBackground,
                ]}>
                <Image
                  source={iconSource}
                  style={[
                    styles.tabIcon,
                    {tintColor: focused ? '#000' : '#fff'},
                  ]}
                />
              </View>
              <Text
                style={[styles.tabLabel, {color: focused ? '#fff' : '#fff'}]}>
                {route.name}
              </Text>
            </View>
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreenWrapper} />
      <Tab.Screen name="Categories" component={CategoriesWrapper} />
      <Tab.Screen name="Coaches" component={CoachesWrapper} />
    </Tab.Navigator>
  );
};

const HomeScreenWrapper = ({navigation, route}) => (
  <MainLayout>
    <HomeScreen navigation={navigation} route={route} />
  </MainLayout>
);

const CategoriesWrapper = ({navigation, route}) => (
  <MainLayout>
    <Categories navigation={navigation} route={route} />
  </MainLayout>
);

const CoachesWrapper = ({navigation, route}) => (
  <MainLayout>
    <Coaches navigation={navigation} route={route} />
  </MainLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    backgroundColor: '#675987',
    height: 70, // Adjust for better visibility
    position: 'absolute',
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
  },
  iconBackground: {
    width: 90,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  activeIconBackground: {
    backgroundColor: '#fff',
  },
  tabIcon: {
    width: 34,
    height: 34,
    resizeMode: 'contain',
  },
  tabLabel: {
    fontSize: 14,
    marginTop: 5, // Space between icon and label
    color: '#fff', // Default white text
  },
});

export default App;
