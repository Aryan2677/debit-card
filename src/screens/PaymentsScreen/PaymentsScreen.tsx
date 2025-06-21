import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {styles} from './PaymentsScreen.styles';

const PaymentsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Payments</Text>
        <Text style={styles.subtitle}>
          Manage your payments and transactions
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PaymentsScreen;
