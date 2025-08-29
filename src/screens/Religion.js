import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useForm, Controller} from 'react-hook-form';
import RNPickerSelect from 'react-native-picker-select'; // ✅ Import added

// Import SVG icons
import Ellipse1 from '../assets/Ellipse1.svg';
import Ellipse2 from '../assets/Ellipse2.svg';
import Ellipse3 from '../assets/Ellipse3.svg';
import Ellipse4 from '../assets/Ellipse4.svg';
import LotusYoga from '../assets/lotus-yoga_svgrepo.com.svg';

// Import themes
import {lightTheme, darkTheme} from '../styles/themes.js';

const {width} = Dimensions.get('window');

const Religion = ({theme = 'light'}) => {
  const {control, handleSubmit} = useForm();

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;
  const isTablet = width >= 768;

  const onSubmit = data => {
    console.log('Selected Religion:', data.religion);
  };

  return (
    <LinearGradient
      style={styles.login}
      locations={[0, 1]}
      colors={['#dacaff', '#f4ffe1']}
      useAngle={true}
      angle={180}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            {/* SVG Icons */}
            <View style={styles.svgContainer}>
              <Ellipse1
                width={isTablet ? 15 : 7}
                height={isTablet ? 15 : 7}
                style={styles.svgItem}
              />
              <Ellipse2
                width={isTablet ? 30 : 15}
                height={isTablet ? 28 : 14}
                style={styles.svgItem}
              />
              <Ellipse3
                width={isTablet ? 45 : 22}
                height={isTablet ? 45 : 22}
                style={styles.svgItem}
              />
              <Ellipse4
                width={isTablet ? 60 : 30}
                height={isTablet ? 58 : 29}
              />
              <LotusYoga
                width={isTablet ? 150 : 100}
                height={isTablet ? 250 : 171}
                style={styles.lotusIcon}
              />
            </View>

            {/* Religion Dropdown */}
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="religion"
                defaultValue=""
                render={({field: {onChange, value}}) => (
                  <RNPickerSelect
                    onValueChange={onChange}
                    value={value}
                    items={[
                      {label: 'Hinduism', value: 'hinduism'},
                      {label: 'Christianity', value: 'christianity'},
                      {label: 'Islam', value: 'islam'},
                      {label: 'Buddhism', value: 'buddhism'},
                      {label: 'Sikhism', value: 'sikhism'},
                    ]}
                    placeholder={{label: 'Select Religion...', value: null}}
                    style={pickerSelectStyles}
                  />
                )}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: currentTheme.buttonBackground},
              ]}
              onPress={handleSubmit(onSubmit)}>
              <Text style={[styles.buttonText]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

// Picker Styles
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25, // ✅ rounded same as inputContainer
    color: '#000',
    backgroundColor: '#fff',
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25, // ✅ rounded same as inputContainer
    color: '#000',
    backgroundColor: '#fff',
  },
});

const styles = StyleSheet.create({
  login: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  container: {
    width: width * 0.9,
    alignItems: 'center',
    gap: 40,
    paddingTop: 20,
  },
  svgContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -10,
  },
  svgItem: {
    marginBottom: 20,
  },
  lotusIcon: {
    marginTop: -20,
  },
  inputContainer: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden', // ✅ makes RNPickerSelect stay inside rounded box
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Religion;
