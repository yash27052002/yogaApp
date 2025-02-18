import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ScrollView, Image } from 'react-native';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';

const VideoPlayer = ({ navigation }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time) => {
    videoRef.current.seek(time);
  };

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  const handleLoad = (data) => {
    setDuration(data.duration);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  const handleForward = () => {
    const newTime = currentTime + 10; // Forward by 10 seconds
    if (newTime < duration) {
      setCurrentTime(newTime);
      videoRef.current.seek(newTime);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text> {/* Unicode back arrow */}
        </TouchableOpacity>
      </View>

      {/* Video Wrapper */}
      <View style={styles.videoWrapper}>
        <Video
          ref={videoRef}
          source={{ uri: 'https://www.w3schools.com/html/mov_bbb.mp4' }}
          style={[styles.video, isFullScreen ? styles.fullScreenVideo : null]} // Apply full-screen style if needed
          resizeMode="cover"
          paused={!isPlaying}
          onEnd={handleEnd}
          onProgress={handleProgress}
          onLoad={handleLoad}
          muted={isMuted} // Apply mute state
        />
      </View>

      {/* Time Scroller and Play/Pause */}
      <View style={styles.timeContainer}>
        <TouchableOpacity onPress={handlePlayPause}>
          <Image
            source={isPlaying ? require('../assets/pause.png') : require('../assets/play.png')}
            style={styles.buttonIcon}
          />
        </TouchableOpacity>

        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={handleSeek}
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Video Control Buttons */}
      <View style={styles.controlContainer}>
        <TouchableOpacity onPress={handleForward} style={styles.controlButton}>
          <Image source={require('../assets/forward.png')} style={styles.controlIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMuteToggle} style={styles.controlButton}>
          <Image
            source={isMuted ? require('../assets/mute.png') : require('../assets/unmute.png')}
            style={styles.controlIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleFullScreenToggle} style={styles.controlButton}>
          <Image
            source={isFullScreen ? require('../assets/expand.png') : require('../assets/expand.png')}
            style={styles.controlIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Content Below Video */}
      <View style={[styles.frameParent1, styles.frameParentFlexBox]}>
        <View style={styles.ellipseParent}>
          <View style={styles.aravindhParent}>
            <Text style={[styles.aravindh, styles.homeTypo]}>Aravindh</Text>
            <Text style={[styles.kFollowers, styles.kFollowersTypo]}>1.3K followers</Text>
          </View>
        </View>
        <View style={[styles.followWrapper, styles.followWrapperSpaceBlock]}>
          <Text style={[styles.home, styles.homeTypo]}>Follow</Text>
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
  );
};

// Format time to mm:ss
const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? `0${mins}` : mins}:${secs < 10 ? `0${secs}` : secs}`;
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
    left: 10,
    top: 10,
  },
  videoWrapper: {
    position: 'relative',
    width: '100%',
    height: 200,
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
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  timeText: {
    fontSize: 14,
    color: '#555',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  controlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  controlButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  controlIcon: {
    width: 25, // Reduced the icon size
    height: 25, // Reduced the icon size
  },
  footer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#1a1a1a',
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 24,
    color: '#fff',
  },
  buttonIcon: {
    width: 30, // Adjusted the play/pause icon size
    height: 30, // Adjusted the play/pause icon size
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
  frameParent1: {
    marginTop: 20,
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
