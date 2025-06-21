import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {styles} from './HomeScreen.styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>Welcome to your home screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
