import React, {useState} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import {logo, backArrow} from '../../assets/images';
import {formatCurrencywithComma} from '../../utils/utils';
import Button from '../../components/Button/Button';
import FormContainer from '../../components/FormContainer/FormContainer';
import {SpendingLimitProps} from '../../interface';
import {styles} from './SpendingLimit.styles';
import {STRINGS} from '../../constants/strings';

// Spending limit management screen with preset and custom amounts
const SpendingLimit = ({navigation, route}: SpendingLimitProps) => {
  const currentLimit = route?.params?.currentLimit || 0;
  const [selectedAmount, setSelectedAmount] = useState(currentLimit);
  const [customAmount, setCustomAmount] = useState(
    currentLimit > 0 ? formatCurrencywithComma(currentLimit) : '',
  );

  // Handle preset amount selection
  const handlePresetSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount(formatCurrencywithComma(amount));
  };

  // Save spending limit and navigate back
  const handleSave = () => {
    const limitToSave = selectedAmount || parseInt(customAmount) || 0;
    navigation.navigate('Dashboard', {
      newSpendingLimit: limitToSave,
    });
  };

  const handleCustomAmountChange = (text: string) => {
    // Remove commas and any non-numeric characters except empty string
    const cleanText = text.replace(/,/g, '');
    const numericValue = parseInt(cleanText) || 0;

    setSelectedAmount(numericValue);
    // Format with commas for display
    setCustomAmount(
      numericValue > 0 ? formatCurrencywithComma(numericValue) : '',
    );
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.outerContainer}>
        <View style={styles.container}>
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={backArrow}
                style={styles.backArrow}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>
          <View style={styles.leftContainer}>
            <Text style={styles.heading}>{STRINGS.spendingLimitTitle}</Text>
          </View>
        </View>

        <View style={styles.content}>
          <FormContainer
            customAmount={customAmount}
            handleCustomAmountChange={handleCustomAmountChange}
            handlePresetSelect={handlePresetSelect}
            selectedAmount={selectedAmount}
          />
          <Button
            selectedAmount={selectedAmount}
            customAmount={customAmount}
            handleSave={handleSave}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SpendingLimit;
