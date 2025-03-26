import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Import SVG icons
import Ellipse1 from "../../assets/Ellipse1.svg";
import Ellipse2 from "../../assets/Ellipse2.svg";
import Ellipse3 from "../../assets/Ellipse3.svg";
import Ellipse4 from "../../assets/Ellipse4.svg";
import LotusYoga from "../../assets/lotus-yoga_svgrepo.com.svg";
import GoogleIcon from "../../assets/google-color_svgrepo.com.svg";

// Import themes
import { lightTheme, darkTheme } from "../../styles/themes.js"; 
import { useDispatch } from 'react-redux';
import { googleLogin, phoneRegister } from '../../redux/authSlice.js'; // Import your action
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get("window");


// Google SignIn setup
GoogleSignin.configure({
  webClientId: '105883230649-ki5jdvrgsp9tiht5mkdo9g9ui2pbo9t9.apps.googleusercontent.com',

});

const Login = ({ theme = "light" }) => {
  const { width, height } = useWindowDimensions();
  
  const isTablet = width >= 768;  // Check for tablet
  const isLandscape = width > height;  // Check for landscape mode
  const { control, handleSubmit } = useForm();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [countryCode, setCountryCode] = useState('+1');
  const [countryModalVisible, setCountryModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const countryList = [
    { code: '+1', name: 'United States' },
    { code: '+44', name: 'United Kingdom' },
    { code: '+91', name: 'India' },
    { code: '+61', name: 'Australia' },
    // Add more countries here
  ];

  // Google Login function
  const GoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      console.log('User Email:', userInfo.data.user.email);
      console.log('ID Token:', userInfo.data.idToken);
      const email = userInfo.data.user.email;
      const idToken = userInfo.data.idToken;

      // Store in AsyncStorage
      await AsyncStorage.setItem('Email', email);
      await AsyncStorage.setItem('IdToken', idToken);
    } catch (error) {
      console.error("error while google login", error)
    }
  };

  // Phone Number Handler
  const handlePhoneNumber = (data) => {
    const userPhoneNumber = `${countryCode}${data.username}`.replace(/\s/g, ''); 
    console.log(userPhoneNumber);
    
    if (!userPhoneNumber) {
      alert("Please enter a valid phone number");
      return;
    }

    navigation.navigate('OtpScreen');
  };

  const onSelectCountry = (country) => {
    setCountryCode(country.code);
    setCountryModalVisible(false);
  };

  // Choose the theme based on the prop
  const currentTheme = theme === "dark" ? darkTheme : lightTheme;

  const filteredCountries = countryList.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <LinearGradient
      style={styles.login}
      locations={[0, 1]}
      colors={["#dacaff", "#f4ffe1"]}
      useAngle={true}
      angle={180}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
<ScrollView 
  contentContainerStyle={[styles.scrollContainer]} 
  keyboardShouldPersistTaps="handled"
>          <View style={styles.container}>
            {/* SVG Icons */}
            <View style={styles.svgContainer}>
              <Ellipse1 width={7} height={7} style={styles.svgItem} />
              <Ellipse2 width={15} height={14} style={styles.svgItem} />
              <Ellipse3 width={22} height={22} style={styles.svgItem} />
              <Ellipse4 width={30} height={29} />
              <LotusYoga width={100} height={171} style={styles.lotusIcon} />
            </View>

            {/* Login Form */}
            <View style={styles.formContainer}>
              <Text style={[styles.loginText, { fontSize: isTablet ? 22 : 18, color: currentTheme.textColor }]}>
                Login with your Phone Number
              </Text>

              <View style={[styles.inputContainer]}>
                {/* Country Code Modal */}
                <TouchableOpacity onPress={() => setCountryModalVisible(true)}>
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                </TouchableOpacity>

                {/* Phone number input */}
                <Controller
                  control={control}
                  name="PhoneNumber"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      style={styles.input}
                      placeholder="Phone number"
                      placeholderTextColor="#9f9e9e"
                      onChangeText={onChange}
                      value={value}
                      keyboardType="phone-pad"
                    />
                  )}
                />
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.mobileButton,
                    { backgroundColor: currentTheme.buttonBackground }
                  ]}
                  onPress={handleSubmit(handlePhoneNumber)}
                >
                  <Text style={styles.buttonText}>Verify with Mobile</Text>
                </TouchableOpacity>

                <Text style={[styles.orText, { color: currentTheme.orTextColor }]}>- or -</Text>

                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.googleButton,
                    {
                      backgroundColor: currentTheme.googleButtonBackground,
                      
                    }
                  ]}
                  onPress={GoogleLogin}
                >
                  <GoogleIcon width={25} height={25} />
                  <Text style={styles.googleText}>Sign in with Google</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Code Modal */}
      <Modal
        visible={countryModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setCountryModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setCountryModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search country"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <ScrollView style={styles.countryList}>
              {filteredCountries.map((country) => (
                <TouchableOpacity
                  key={country.code}
                  onPress={() => onSelectCountry(country)}
                  style={styles.countryItem}
                >
                  <Text style={styles.countryText}>{country.name} ({country.code})</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
  login: {
    flex: 1,
    width: "100%",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
    marginTop:-20
  },
  container: {
    width: width * 0.9,
    alignItems: "center",
    gap: 40,
    paddingTop: 20,
  },
  svgContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: -30,
  },
  svgItem: {
    marginBottom: 20,
  },
  lotusIcon: {
    marginTop: -20,
  },
  formContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: -10,
  },
  loginText: {
    textAlign: "center",
    marginBottom: 20,
  },
  inputContainer: {
    width: width * 0.7,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 15,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  countryCodeText: {
    fontSize: 15,
    marginLeft: 15,
  },
  buttonRow: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  button: {
    width: width * 0.7,
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 10,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    paddingHorizontal: 15,
  },
  googleText: {
    fontSize: 15,
    color: '#fff',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "80%",
    padding: 20,
    maxHeight: "70%",
  },
  
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  
  countryList: {
    maxHeight: 250,
  },
  
  countryItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  
  countryText: {
    fontSize: 16,
    color: "#333",
  },
  
});

export default Login;
