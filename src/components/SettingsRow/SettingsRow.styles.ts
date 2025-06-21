import {StyleSheet} from 'react-native';
import {Fonts} from '../../assets/fonts';
import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    justifyContent: 'space-between',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
  textContainer: {
    gap: 2,
  },
  title: {
    fontSize: 14,
    color: COLORS.DARK_BLUE,
    fontFamily: Fonts.AvenirNextMedium,
  },
  description: {
    fontSize: 13,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextRegular,
  },
});
