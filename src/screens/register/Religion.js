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
  useWindowDimensions,
  Modal,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Ellipse1 from '../../assets/Ellipse1.svg';
import Ellipse2 from '../../assets/Ellipse2.svg';
import Ellipse3 from '../../assets/Ellipse3.svg';
import Ellipse4 from '../../assets/Ellipse4.svg';
import LotusYoga from '../../assets/lotus-yoga_svgrepo.com.svg';
import {lightTheme, darkTheme} from '../../styles/themes.js';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {setReligion} from '../../redux/formSlice.js';
import {useForm} from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const Religion = ({theme = 'light'}) => {
  const navigation = useNavigation();
  const {width, height} = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height;

  const {setValue, getValues} = useForm();
  const dispatch = useDispatch();

  const [selectedReligion, setSelectedReligion] = useState('Select Religion');
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ Hardcoded list of religions
  const religions = [
    {religionId: 1, religionName: 'Hinduism'},
    {religionId: 2, religionName: 'Christianity'},
    {religionId: 3, religionName: 'Islam'},
    {religionId: 4, religionName: 'Sikhism'},
    {religionId: 5, religionName: 'Buddhism'},
    {religionId: 6, religionName: 'Jainism'},
    {religionId: 7, religionName: 'Judaism'},
    {religionId: 8, religionName: 'Other'},
  ];

  // Function to handle selection
  const handleSelectReligion = religion => {
    setSelectedReligion(religion.religionName);
    setModalVisible(false);
    setValue('religion', religion.religionName);
    setValue('religionId', religion.religionId);
  };

  const religionData = useSelector(state => state.user);

  const handleContinue = async () => {
    const religion = getValues('religion');
    const religionId = getValues('religionId');

    if (religionId) {
      await AsyncStorage.setItem('religionId', religionId.toString());
    }
    if (religion && religion !== 'Select Religion') {
      dispatch(setReligion(religion));
    }
    console.log('Updated Religion:', religionData);
    navigation.navigate('Destination');
  };

  const currentTheme = theme === 'dark' ? darkTheme : lightTheme;

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
          contentContainerStyle={[
            styles.scrollContainer,
            isLandscape && {transform: [{scale: 1.0}]},
          ]}
          keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <View style={styles.svgContainer}>
              <Ellipse1 width={7} height={7} style={styles.svgItem} />
              <Ellipse2 width={15} height={14} style={styles.svgItem} />
              <Ellipse3 width={22} height={22} style={styles.svgItem} />
              <Ellipse4 width={30} height={29} />
              <LotusYoga width={100} height={171} style={styles.lotusIcon} />
            </View>

            <View
              style={[styles.inputContainer, {width: isTablet ? 400 : '100%'}]}>
              <TouchableOpacity
                onPress={() => setModalVisible(true)}
                style={styles.pickerContainer}>
                <Text style={styles.pickerText}>{selectedReligion}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: currentTheme.buttonBackground,
                  width: isTablet ? 400 : '100%',
                },
              ]}
              onPress={handleContinue}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modal for Religion Selection */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Religion</Text>
            <FlatList
              data={religions}
              keyExtractor={item => item.religionId.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelectReligion(item)}>
                  <Text style={styles.modalItemText}>{item.religionName}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

// Styles
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
    height: 50,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerText: {
    color: '#000',
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
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: width * 0.6,
    height: height * 0.5,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalItem: {
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  modalItemText: {
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#d32f2f',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Religion;
