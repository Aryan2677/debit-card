import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {styles} from './ProfileScreen.styles';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your account and settings</Text>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
