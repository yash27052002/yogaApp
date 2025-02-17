import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Video from 'react-native-video';  // Import the video player
import { useWindowDimensions } from 'react-native';

// Get the screen dimensions
const { width, height } = Dimensions.get('window');

const VideoPlayer = ({ videoUrl }) => {
  const [paused, setPaused] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const { width, height } = useWindowDimensions();  // For dynamic scaling of full-screen mode

  const togglePause = () => setPaused(!paused);
  const toggleFullscreen = () => setFullscreen(!fullscreen);

  return (
    <View style={styles.container}>
      {/* Video Player */}
      <Video
        source={{ uri: videoUrl }} // Video source URL
        style={[styles.video, fullscreen ? { width: height, height: width } : { width, height: 250 }]} // Dynamically adjust video size for fullscreen
        resizeMode="contain"
        paused={paused} // Control playback (paused / play)
        controls={true} // Show play/pause and seek controls
        onEnd={() => setPaused(true)} // Auto-pause when the video ends
      />
      
      {/* Video Control Buttons */}
      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={togglePause}>
          <Text style={styles.buttonText}>{paused ? "Play" : "Pause"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={toggleFullscreen}>
          <Text style={styles.buttonText}>{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  video: {
    width: width,
    height: 250,
    backgroundColor: 'black',
  },
  controls: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VideoPlayer;
