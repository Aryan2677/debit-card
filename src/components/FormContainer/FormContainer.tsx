import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './FormContainer.styles';
import {limitIcon} from '../../assets/images';
import {COLORS} from '../../constants/colors';
import {formatCurrencywithComma} from '../../utils/utils';
import {STRINGS} from '../../constants/strings';

const PRESET_AMOUNTS = [5000, 10000, 20000];

type FormContainerProps = {
  customAmount: string;
  handleCustomAmountChange: (text: string) => void;
  handlePresetSelect: (amount: number) => void;
  selectedAmount: number;
};

const FormContainer = ({
  customAmount,
  handleCustomAmountChange,
  handlePresetSelect,
  selectedAmount,
}: FormContainerProps) => {
  return (
    <View style={styles.formContainer}>
      <View style={styles.iconRow}>
        <Image source={limitIcon} style={styles.iconText} />
        <Text style={styles.formTitle}>{STRINGS.setWeeklyLimit}</Text>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.currencyContainer}>
          <Text style={styles.currencyText}>{STRINGS.defaultCurrency}</Text>
        </View>
        <TextInput
          style={styles.amountInput}
          value={customAmount}
          onChangeText={handleCustomAmountChange}
          placeholder={STRINGS.amountPlaceholder}
          placeholderTextColor={COLORS.TEXT_GRAY}
          keyboardType="numeric"
        />
      </View>

      <Text style={styles.noteText}>{STRINGS.weeklyMeansLast7Days}</Text>

      <View style={styles.presetContainer}>
        {PRESET_AMOUNTS.map(amount => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.presetButton,
              selectedAmount === amount && styles.presetButtonSelected,
            ]}
            onPress={() => handlePresetSelect(amount)}>
            <Text
              style={[
                styles.presetText,
                selectedAmount === amount && styles.presetTextSelected,
              ]}>
              {STRINGS.defaultCurrency} {formatCurrencywithComma(amount)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FormContainer;
