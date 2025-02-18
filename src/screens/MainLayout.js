import React from 'react';
import { View, StyleSheet } from 'react-native';
import Navbar from './Navbar';

const MainLayout = ({ children }) => (
    <View style={styles.container}>
      <Navbar />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    content: {
      flex: 1,
      marginHorizontal: 0,
      marginTop: 0,  // Ensure no top margin is added
    },
  });
  
  
  export default MainLayout;
  