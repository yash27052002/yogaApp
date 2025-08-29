import React, {useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import {setPreference} from '../../redux/formSlice';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// SVG icons
import Ellipse1 from '../../assets/Ellipse1.svg';
import Ellipse2 from '../../assets/Ellipse2.svg';
import Ellipse3 from '../../assets/Ellipse3.svg';
import Ellipse4 from '../../assets/Ellipse4.svg';
import LotusYoga from '../../assets/lotus-yoga_svgrepo.com.svg';

const {width} = Dimensions.get('window');

const Preference = ({theme = 'light'}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // Hardcoded Preferences
  const preferencesList = [
    {preferenceId: 1, preferenceName: 'Meditation'},
    {preferenceId: 2, preferenceName: 'Chanting'},
    {preferenceId: 3, preferenceName: 'Prayer'},
    {preferenceId: 4, preferenceName: 'Yoga'},
    {preferenceId: 5, preferenceName: 'Bhajans'},
  ];

  const [selectedGods, setSelectedGods] = useState([]);

  // Redux state
  const {name, age, religion, destination, boardingTime} = useSelector(
    state => state.user,
  );

  // Toggle selection
  const handleSelectGod = preferenceName => {
    setSelectedGods(prev =>
      prev.includes(preferenceName)
        ? prev.filter(item => item !== preferenceName)
        : [...prev, preferenceName],
    );
  };

// On Submit
const onSubmit = async () => {
  const preferencesFormatted = preferencesList
    .filter(p => selectedGods.includes(p.preferenceName))
    .map(({preferenceId, preferenceName}) => ({
      preferencesId: preferenceId,
      preferencesName: preferenceName,
    }));

  dispatch(setPreference(preferencesFormatted));

  // ✅ save login status for App.js
  await AsyncStorage.setItem('userStatus', 'true');

  console.log('Saved Preferences:', preferencesFormatted);
  console.log('User Status Saved');

  // go to Home
  navigation.replace('HomeTabs');
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
              <Ellipse1 width={7} height={7} style={styles.svgItem} />
              <Ellipse2 width={15} height={14} style={styles.svgItem} />
              <Ellipse3 width={22} height={22} style={styles.svgItem} />
              <Ellipse4 width={30} height={29} />
              <LotusYoga width={100} height={171} style={styles.lotusIcon} />
            </View>

            {/* Preference Buttons */}
            <View style={styles.godButtonsContainer}>
              {preferencesList.map(preference => (
                <TouchableOpacity
                  key={preference.preferenceId}
                  style={[
                    styles.godButton,
                    selectedGods.includes(preference.preferenceName) &&
                      styles.selectedButton,
                  ]}
                  onPress={() => handleSelectGod(preference.preferenceName)}>
                  <Text
                    style={[
                      styles.godButtonText,
                      selectedGods.includes(preference.preferenceName) &&
                        styles.selectedButtonText,
                    ]}>
                    {preference.preferenceName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Submit */}
            <TouchableOpacity style={styles.button} onPress={onSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

// Styles
const styles = StyleSheet.create({
  login: {flex: 1, width: '100%'},
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  container: {width: width * 0.9, alignItems: 'center', gap: 40, paddingTop: 20},
  svgContainer: {flexDirection: 'column', alignItems: 'center', marginBottom: -10},
  svgItem: {marginBottom: 20},
  lotusIcon: {marginTop: -20},
  godButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 30,
  },
  godButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {backgroundColor: '#6a4cff'},
  godButtonText: {fontSize: 14, color: '#000'},
  selectedButtonText: {color: '#fff'},
  button: {
    width: width * 0.5,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: '#6a4cff',
    marginBottom: 20,
  },
  buttonText: {color: '#fff', fontSize: 16},
});

export default Preference;
