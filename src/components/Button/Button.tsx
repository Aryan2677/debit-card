import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './Button.styles';
import {STRINGS} from '../../constants/strings';

const Button = ({
  selectedAmount,
  customAmount,
  handleSave,
}: {
  selectedAmount: number;
  customAmount: string;
  handleSave: () => void;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.saveButton,
        (selectedAmount > 0 || customAmount) && styles.saveButtonActive,
      ]}
      onPress={handleSave}
      disabled={!selectedAmount && !customAmount}>
      <Text style={styles.saveButtonText}>{STRINGS.save}</Text>
    </TouchableOpacity>
  );
};

export default Button;
