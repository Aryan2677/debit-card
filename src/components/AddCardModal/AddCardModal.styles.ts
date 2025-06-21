import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 16,
    width: width - 40,
    maxWidth: 400,
    maxHeight: height * 0.8,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
  },
  title: {
    fontSize: 20,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextDemi,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.BORDER,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextRegular,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  description: {
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: Fonts.AvenirNextRegular,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
    marginBottom: 8,
    fontFamily: Fonts.AvenirNextMedium,
  },
  textInput: {
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: COLORS.BG_GREEN,
    fontFamily: Fonts.AvenirNextRegular,
  },
  textInputError: {
    borderColor: COLORS.RED,
    backgroundColor: COLORS.BG_RED,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.RED,
    marginTop: 4,
    fontFamily: Fonts.AvenirNextRegular,
  },
  infoBox: {
    backgroundColor: COLORS.BG_GREEN,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.BLUE,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.TEXT_GRAY,
    marginBottom: 8,
    fontFamily: Fonts.AvenirNextDemi,
  },
  infoText: {
    fontSize: 13,
    color: COLORS.TEXT_GRAY,
    lineHeight: 18,
    fontFamily: Fonts.AvenirNextRegular,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingBottom: 24,
    paddingTop: 16,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextMedium,
  },
  addButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: COLORS.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  addButtonDisabled: {
    backgroundColor: COLORS.BORDER,
  },
  addButtonText: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontFamily: Fonts.AvenirNextDemi,
  },
});
