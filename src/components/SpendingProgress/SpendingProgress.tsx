import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './SpendingProgress.styles';

interface SpendingProgressProps {
  currentSpending: number;
  spendingLimit: number;
}

const SpendingProgress = ({
  currentSpending,
  spendingLimit,
}: SpendingProgressProps) => {
  if (spendingLimit <= 0) {
    return null;
  }

  const progressPercentage = Math.min(
    (currentSpending / spendingLimit) * 100,
    100,
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRowContainer}>
        <Text style={styles.title}>Debit card spending limit</Text>

        <View style={styles.amountRow}>
          <Text style={styles.currentAmount}>
            ${currentSpending.toLocaleString()}
          </Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.totalAmount}>
            ${spendingLimit.toLocaleString()}
          </Text>
        </View>
      </View>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[styles.progressBarFill, {width: `${progressPercentage}%`}]}
          />
        </View>
      </View>
    </View>
  );
};

export default SpendingProgress;
