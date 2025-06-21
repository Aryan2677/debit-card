import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './DashboardHeader.styles';
import {logo} from '../../assets/images';

interface DashboardHeaderProps {
  availableBalance: number;
  currency: string;
}

const DashboardHeader = ({
  availableBalance,
  currency,
}: DashboardHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.leftContainer}>
          <Text style={styles.heading}>Debit Card</Text>
          <Text style={styles.subHeading}>Available balance</Text>
          <View style={styles.balanceRow}>
            <View style={styles.balanceCard}>
              <Text style={styles.balaceCardText}>{currency}</Text>
            </View>
            <Text style={styles.balanceText}>
              {availableBalance.toLocaleString()}
            </Text>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Image source={logo} style={styles.logo} resizeMode="contain" />
        </View>
      </View>
    </View>
  );
};

export default DashboardHeader;
