import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 26,
    paddingBottom: 8,
    backgroundColor: COLORS.WHITE,
  },
  topRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 13,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextMedium,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currentAmount: {
    fontSize: 13,
    color: COLORS.GREEN,
    fontFamily: Fonts.AvenirNextDemi,
  },
  separator: {
    fontSize: 13,
    color: COLORS.LIGHT_GRAY,
    marginHorizontal: 8,
    fontFamily: Fonts.AvenirNextMedium,
  },
  totalAmount: {
    fontSize: 13,
    color: COLORS.LIGHT_GRAY,
    fontFamily: Fonts.AvenirNextMedium,
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 6,
  },
  progressBarBackground: {
    height: 15,
    backgroundColor: COLORS.BG_GREEN,
    borderRadius: 30,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.GREEN,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
