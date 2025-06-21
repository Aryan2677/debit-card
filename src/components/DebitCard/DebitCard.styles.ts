import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: COLORS.GREEN,
    borderRadius: 12,
  },
  logoContainer: {
    alignItems: 'flex-end',
  },
  cardName: {
    fontSize: 22,
    color: COLORS.WHITE,
    marginTop: 24,
    fontFamily: Fonts.AvenirNextBold,
  },
  cardNumberContainer: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontFamily: Fonts.AvenirNextDemi,
  },
  cardDetailsContainer: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
  cardDetailsText: {
    fontSize: 13,
    color: COLORS.WHITE,
    fontFamily: Fonts.AvenirNextDemi,
  },
  cardTypeContainer: {
    alignItems: 'flex-end',
    marginTop: 4,
  },
  showHideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingBottom: 16,
    paddingHorizontal: 12,
    paddingTop: 8,
    marginBottom: -12,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: COLORS.WHITE,
  },
  eyeIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  showHideText: {
    fontSize: 12,
    color: COLORS.GREEN,
    marginLeft: 6,
    fontFamily: Fonts.AvenirNextDemi,
  },
  cardWrapper: {
    marginHorizontal: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  cardNameText: {
    fontSize: 16,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextDemi,
  },
  frozenCard: {
    backgroundColor: COLORS.TEXT_GRAY_2,
  },
});
