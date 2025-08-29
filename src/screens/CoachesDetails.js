import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  useWindowDimensions,
} from 'react-native';
import Navbar from './Navbar';

const CoachesDetails = ({navigation}) => {
  const {width} = useWindowDimensions();

  // Sample Data
  const upcomingDates = [
    {month: 'Mar', date: '15', day: 'Mon'},
    {month: 'Mar', date: '16', day: 'Tue'},
    {month: 'Mar', date: '17', day: 'Wed'},
    {month: 'Mar', date: '18', day: 'Thu'},
  ];

  const timeSlots = [
    '4:00 PM',
    '5:00 PM',
    '6:00 PM',
    '7:00 PM',
    '8:00 PM',
    '9:00 PM',
  ];
  const timeSlots2 = ['5:00 PM', '6:00 PM', '7:00 PM', '4:00 PM'];

  // State to track selected date and time
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedTime2, setSelectedTime2] = useState(null);

  return (
    <View style={{flex: 1}}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backIcon}>←</Text> {/* Unicode back arrow */}
          </TouchableOpacity>
        </View>

        {/* Coach Info */}
        <View style={[styles.frameParent, styles.parentFlexBox]}>
          <View style={[styles.ellipseParent, styles.parentFlexBox]}>
            <Image
              style={styles.frameChild}
              resizeMode="cover"
              source={require('../assets/coachDp.png')}
            />
            <View style={styles.aravindhParent}>
              <Text style={styles.aravindh}>Aravindh</Text>
              <Text style={[styles.kFollowers, styles.followTypo]}>
                1.3K followers
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.followWrapper, styles.parentFlexBox]}>
            <Text style={[styles.follow, styles.followTypo]}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Video Description */}
        <View style={styles.videoDescriptionParent}>
          <Text style={[styles.loremIpsumDolor, styles.kFollowersTypo]}>
            Aravindh is a dedicated and passionate yoga trainer with a deep
            understanding of the ancient art of yoga.{' '}
          </Text>
        </View>

        {/* Coach Availability Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Coach Availability</Text>
          <View style={styles.dateContainer}>
            {upcomingDates.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCard,
                  selectedDate === index && styles.selectedCard,
                ]}
                onPress={() => setSelectedDate(index)}>
                <Text style={styles.dateText}>{item.month}</Text>
                <Text style={styles.dateNumber}>{item.date}</Text>
                <Text style={styles.dateText}>{item.day}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Group Session Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time Slots for Group Session</Text>
          <View style={styles.timeContainer}>
            {timeSlots.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeCard,
                  selectedTime === index && styles.selectedCard,
                ]}
                onPress={() => setSelectedTime(index)}>
                <Text style={styles.cardText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 1-on-1 Session Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Time Slots for 1-on-1 Session</Text>
          <View style={styles.timeContainer}>
            {timeSlots2.map((time, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.timeCard,
                  selectedTime2 === index && styles.selectedCard,
                ]}
                onPress={() => setSelectedTime2(index)}>
                <Text style={styles.cardText}>{time}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Book Slot Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Book A Slot</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 10,
    padding: 8,
    borderRadius: 5,
  },
  backIcon: {
    fontSize: 30,
  },
  parentFlexBox: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 20,
  },
  frameChild: {
    width: 300,
    height: 220,
    borderRadius: 20,
  },
  aravindh: {
    fontSize: 20,
    textAlign: 'center',
    color: '#000',
  },
  kFollowers: {
    fontSize: 16,
    textAlign: 'left',
  },
  followWrapper: {
    borderRadius: 25,
    backgroundColor: '#dacaff',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  frameParent: {
    flex: 1,
    width: '100%',
    gap: 17,
    alignItems: 'center',
    marginBottom: 25,
  },
  videoDescriptionParent: {
    padding: 15,
    marginBottom: 20,
  },
  loremIpsumDolor: {
    fontSize: 23,
    color: '#666',
    marginTop: 15,
  },

  /* Section Titles */
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  /* Date Cards */
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  dateCard: {
    backgroundColor: '#E7E7E7',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    width: 80,
    height: 90,
    justifyContent: 'center',
    marginRight: 10,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },

  /* Time Slot Cards */
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeCard: {
    backgroundColor: '#fff',
    borderWidth: 0.6,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: '30%',
    alignItems: 'center',
  },

  /* Hover & Click Effects */
  selectedCard: {
    backgroundColor: '#dacaff',
  },

  /* Book Slot Button */
  button: {
    backgroundColor: '#DACAFF',
    width: 300,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 23,
    marginVertical: 20,
    left: 40,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CoachesDetails;
