import {Dimensions} from 'react-native';

export const {height: screenHeight} = Dimensions.get('window');

export const formatCurrencywithComma = (amount: number) => {
  return amount.toLocaleString('en-US');
};
