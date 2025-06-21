import {Platform, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  saveButton: {
    marginHorizontal: 30,
    marginBottom: 24,
    paddingVertical: 16,
    borderRadius: 30,
    backgroundColor: COLORS.GRAY,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOpacity: 0.12, // roughly same as 1F
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 4,
      },
      android: {
        elevation: 4, // tune for similar effect
      },
    }),
  },
  saveButtonActive: {
    backgroundColor: COLORS.GREEN,
  },
  saveButtonText: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontFamily: Fonts.AvenirNextBold,
  },
});
