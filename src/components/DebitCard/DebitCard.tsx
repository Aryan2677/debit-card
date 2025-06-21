import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {styles} from './DebitCard.styles';
import {STRINGS} from '../../constants/strings';
import {aspireLogo, hiddenEye, visaLogo, visibleEye} from '../../assets/images';
import {formatCardNumberForDisplay} from '../../utils/cardUtils';
import {DebitCardProps} from '../../interface';

// Debit card component with show/hide functionality and freeze state
const DebitCard = ({
  cardHolderName = STRINGS.defaultCardHolder,
  cardNumber = '1234567812345678',
  cardCVV = '123',
  cardExpiry = '12/24',
  isFrozen = false,
}: DebitCardProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const eyeIcon = isVisible ? hiddenEye : visibleEye;

  const formattedCardNumber = cardNumber
    ? formatCardNumberForDisplay(cardNumber, isVisible)
    : isVisible
    ? '1234 5678 9012 3456'
    : '**** **** **** 3456';

  return (
    <View style={[styles.cardWrapper]}>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(visible => !visible);
        }}
        activeOpacity={0.6}
        style={[styles.showHideContainer]}>
        <Image source={eyeIcon} style={[styles.eyeIcon]} />
        <Text style={[styles.showHideText]}>
          {isVisible ? STRINGS.hideCardNumber : STRINGS.showCardNumber}
        </Text>
      </TouchableOpacity>

      <View style={[styles.container, isFrozen && styles.frozenCard]}>
        <View style={styles.logoContainer}>
          <Image
            source={aspireLogo}
            style={{width: 74, height: 21}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.cardName}>{cardHolderName}</Text>
        <View style={styles.cardNumberContainer}>
          {formattedCardNumber.split(' ').map((number, index) => (
            <Text key={`${number}-${index}`} style={styles.cardNumber}>
              {number}
            </Text>
          ))}
        </View>
        <View style={styles.cardDetailsContainer}>
          <Text
            style={
              styles.cardDetailsText
            }>{`${STRINGS.thru}: ${cardExpiry}`}</Text>
          <Text style={styles.cardDetailsText}>
            {`${STRINGS.cvv}: ${
              isVisible
                ? cardCVV
                : new Array(cardCVV.length)?.fill(STRINGS.star)?.join('')
            }`}
          </Text>
        </View>
        <View style={styles.cardTypeContainer}>
          <Image
            source={visaLogo}
            style={{width: 59, height: 20}}
            resizeMode="contain"
          />
        </View>
      </View>
    </View>
  );
};

export default DebitCard;
