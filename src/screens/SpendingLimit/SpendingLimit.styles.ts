import {Platform, StatusBar, StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.BLUE,
  },
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  leftContainer: {
    paddingLeft: 24,
  },
  heading: {
    fontSize: 24,
    color: COLORS.WHITE,
    fontFamily: Fonts.AvenirNextBold,
  },
  logo: {width: 25, height: 25},
  backArrow: {width: 16, height: 16},
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.BLUE,
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingTop: 32,
    marginTop: 150,
  },
});
