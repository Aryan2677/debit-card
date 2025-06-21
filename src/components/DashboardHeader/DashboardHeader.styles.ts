import {Platform, StyleSheet, StatusBar} from 'react-native';
import {COLORS} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContainer: {
    paddingTop: 32,
    paddingLeft: 24,
  },
  heading: {
    fontSize: 24,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 14,
    color: COLORS.WHITE,
    marginTop: 24,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    gap: 10,
  },
  balanceText: {
    fontSize: 24,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  balanceCard: {
    backgroundColor: COLORS.GREEN,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  balaceCardText: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontWeight: 'bold',
  },
  rightContainer: {
    paddingTop: 16,
    paddingRight: 24,
    alignItems: 'flex-end',
  },
  logo: {width: 25, height: 25},
});
