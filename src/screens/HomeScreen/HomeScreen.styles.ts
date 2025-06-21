import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.AvenirNextBold,
    color: COLORS.TEXT_GRAY,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: Fonts.AvenirNextRegular,
    color: COLORS.TEXT_GRAY,
    textAlign: 'center',
  },
});
