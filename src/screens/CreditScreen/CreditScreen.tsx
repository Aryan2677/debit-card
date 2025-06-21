import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {styles} from './CreditScreen.styles';

const CreditScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Credit</Text>
        <Text style={styles.subtitle}>Your credit cards and services</Text>
      </View>
    </SafeAreaView>
  );
};

export default CreditScreen;
