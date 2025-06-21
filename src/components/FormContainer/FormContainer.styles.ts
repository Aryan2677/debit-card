import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconText: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  formTitle: {
    flex: 1,
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextMedium,
    lineHeight: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.BORDER,
  },
  currencyContainer: {
    backgroundColor: COLORS.GREEN,
    borderRadius: 3,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginRight: 10,
  },
  currencyText: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: Fonts.AvenirNextBold,
  },
  amountInput: {
    fontSize: 24,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextBold,
    flex: 1,
    paddingVertical: 8,
  },
  noteText: {
    fontSize: 13,
    color: COLORS.LIGHT_GRAY,
    marginTop: 12,
    fontFamily: Fonts.AvenirNextRegular,
  },
  presetContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 32,
  },
  presetButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: COLORS.BG_GREEN,
    alignItems: 'center',
  },
  presetButtonSelected: {
    backgroundColor: COLORS.GREEN,
  },
  presetText: {
    fontSize: 12,
    color: COLORS.GREEN,
    fontFamily: Fonts.AvenirNextBold,
  },
  presetTextSelected: {
    color: COLORS.WHITE,
  },
});
