import React, { useState, useRef , useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image, useWindowDimensions } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Navbar from './Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const VideoPlayer = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const { width, height } = useWindowDimensions();
  const isTablet = width >= 768;
  const isLandscape = width > height; // Detect landscape orientation
  const [watchedTime, setWatchedTime] = useState(0);
  const [lastRecordedTime, setLastRecordedTime] = useState(0);
  const [skippedSections, setSkippedSections] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(false);


useEffect(()=>{
  const fetchVideo = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        console.error('No JWT token found.');
        return;
      }

      console.log('JWT Token:', token); // Log token

      const response = await axios.get(
        'http://43.205.56.106:8080/YogaApp-0.0.1-SNAPSHOT/preferences/getPreferenceVideos?preferenceId=1',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data =  response.data;
      console.log('API Response:', JSON.stringify(data, null, 2));

      if (data?.data?.data?.[0]?.fileData) {
        setVideoUrl(data.data.data[0].fileData);
        console.log('Video URL Set:', data.data.data[0].fileData); // Log video URL
      } else {
        console.error('Video URL not found in the API response');
      }
    } catch (error) {
      console.error('Error fetching video data:', error);
    } finally {
      setLoading(false);
    }
  };
  fetchVideo();
},[])


  

  console.log("Total Watched Time:", watchedTime);
  useEffect(() => {
    console.log("Skipped Sections:", skippedSections);
  }, [skippedSections]);

  const handleProgress = (data) => {
    const current = data.currentTime;
    
    // Track watch time
    if (current > lastRecordedTime && current - lastRecordedTime < 2) {
      setWatchedTime((prev) => prev + (current - lastRecordedTime));
    }
    
    // Detect skips (if the jump is more than 2 seconds)
    if (current > lastRecordedTime + 2) {
      setSkippedSections((prev) => [...prev, { from: lastRecordedTime, to: current }]);
    }
    
    setLastRecordedTime(current);
    setCurrentTime(current);
  };

  const handleSeek = (nativeEvent) => {
    console.log('Seek nativeEvent:', nativeEvent); // Log the entire event
    const from = nativeEvent.currentTime || 0;  // Get the current time
    const to = nativeEvent.seekTime || 0;      // Get the seek time (target time)

    console.log("Seeked from:", from, "to:", to); // Debug log to track the times
    setSkippedSections((prev) => [
      ...prev,
      { from, to }
    ]);
  };

  const handleLoad = (data) => {
    setDuration(data.duration);
  };

  return (
    <View style={{ flex: 1 }}>
      <Navbar />
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backIcon}>←</Text> {/* Unicode back arrow */}
          </TouchableOpacity>

        </View>

        {/* Video Wrapper */}
        <View style={[styles.videoWrapper, {height: isLandscape ? 500 : 200}]}>
          <Video
            ref={videoRef}
            source={{ uri: videoUrl }}
            style={[styles.video, isFullScreen ? styles.fullScreenVideo : {}]} // Conditionally apply full-screen style
            resizeMode="cover"
            paused={!isPlaying}
            onEnd={() => setIsPlaying(false)}
            controls
            onSeek={(event) => handleSeek(event.nativeEvent)}  // Pass only nativeEvent
            onProgress={handleProgress}
            onLoad={handleLoad}
            muted={isMuted}
          />
        </View>

        {/* Content Below Video */}
        <View style={[styles.frameParent, styles.parentFlexBox]}>
          <View style={[styles.ellipseParent, styles.parentFlexBox]}>
            <Image style={styles.frameChild} resizeMode="cover" source={require("../assets/profilepic9.png")} />
            <View style={styles.aravindhParent}>
              <Text style={styles.aravindh}>Aravindh</Text>
              <Text style={[styles.kFollowers, styles.followTypo]}>1.3K followers</Text>
            </View>
          </View>
          <View style={[styles.followWrapper, styles.parentFlexBox]}>
            <Text style={[styles.follow, styles.followTypo]}>Follow</Text>
          </View>
        </View>

        {/* Video Description */}
        <View style={styles.videoDescriptionParent}>
          <Text style={[styles.videoDescription, styles.aravindhLayout]}>Video Description:</Text>
          <Text style={[styles.loremIpsumDolor, styles.kFollowersTypo]}>
            Lorem ipsum dolor sit amet consectetur. Scelerisque scelerisque malesuada id consequat purus gravida.
            Ac velit tristique ultrices a vel arcu. Vivamus iaculis pharetra arcu integer pretium porttitor maecenas.
            Ullamcorper tortor et ac ultricies. Id duis laoreet sit id. Dictum egestas nec ut at sit nunc nunc nunc velit.
            Sed viverra laoreet viverra ut neque dui amet feugiat.
          </Text>
        </View>

        {/* Also View Section */}
        <View style={styles.frameParent5}>
          <View style={[styles.frameParent6, styles.alsoViewPosition]}>
            <Text style={[styles.alsoView, styles.alsoViewPosition]}>Also view</Text>

            {/* Card Views Below "Also View" */}
            <View style={styles.cardView}>
              <View style={styles.storiesOfVishnuParent}>
                <Text style={[styles.storiesOfVishnu, styles.aravindhTypo]}>Stories of Vishnu</Text>
                <Text style={[styles.byAravindh, styles.kFollowersTypo]}>By Aravindh</Text>
              </View>
            </View>

            <View style={styles.cardView}>
              <View style={styles.storiesOfVishnuParent}>
                <Text style={[styles.storiesOfVishnu, styles.aravindhTypo]}>Stories of Vishnu</Text>
                <Text style={[styles.byAravindh, styles.kFollowersTypo]}>By Aravindh</Text>
              </View>
            </View>

            <View style={styles.cardView}>
              <View style={styles.storiesOfVishnuParent}>
                <Text style={[styles.storiesOfVishnu, styles.aravindhTypo]}>Stories of Vishnu</Text>
                <Text style={[styles.byAravindh, styles.kFollowersTypo]}>By Aravindh</Text>
              </View>
            </View>

            <View style={styles.cardView}>
              <View style={styles.storiesOfVishnuParent}>
                <Text style={[styles.storiesOfVishnu, styles.aravindhTypo]}>Stories of Vishnu</Text>
                <Text style={[styles.byAravindh, styles.kFollowersTypo]}>By Aravindh</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    position: 'absolute',
    top: 10,  // Adjust the distance from the top
    left: 10, // Adjust the distance from the left
    zIndex: 10, // Ensures it appears above the video
    padding: 8,
    borderRadius: 5,
  },
  backIcon: {
    fontSize: 30,
  },
  
  videoWrapper: {
    position: 'relative',
    width: '100%',
    marginTop: 40,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  fullScreenVideo: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  
  buttonText: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
  },

  videoDescriptionParent: {
    backgroundColor: '#f4f4f4', // Background color for video description
    padding: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  videoDescription: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loremIpsumDolor: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },

  parentFlexBox: {
    flexDirection: "row",
    alignItems: "center"
  },
  followTypo: {
    textAlign: "left",
    color: "#000",
    fontFamily: "Manrope-Regular"
  },
  frameChild: {
    width: 47,
    height: 47
  },
  aravindh: {
    lineHeight: 20,
    textAlign: "center",
    color: "#000",
    fontFamily: "Manrope-Regular",
    fontSize: 20,
    alignSelf: "stretch"
  },
  kFollowers: {
    fontSize: 16,
    lineHeight: 16,
    textAlign: "left",
    alignSelf: "stretch"
  },
  aravindhParent: {
    width: 98,
    gap: 8,
    alignItems: "center"
  },
  ellipseParent: {
    gap: 5,
    alignItems: "center"
  },
  follow: {
    fontSize: 20,
    textAlign: "left"
  },
  followWrapper: {
    borderRadius: 25,
    backgroundColor: "#dacaff",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center"
  },
  frameParent: {
    flex: 1,
    width: "100%",
    gap: 17,
    alignItems: "center"
  },
  
  cardView: {
    backgroundColor: '#E4DEF3',
    borderRadius: 10,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2, // For Android shadow effect
  },
});

export default VideoPlayer;

