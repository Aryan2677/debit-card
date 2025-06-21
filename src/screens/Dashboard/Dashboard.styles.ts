import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/colors';
import {screenHeight} from '../../utils/utils';

const headerHeight = 200;

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: COLORS.BLUE,
  },
  scrollView: {
    flex: 1,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  absoluteView: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: headerHeight,
  },
  scrollPadding: {height: headerHeight},
  cardContainer: {paddingHorizontal: 24},
  curve: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.WHITE,
    position: 'absolute',
    top: 68,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: -1,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: COLORS.BLUE,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    height: screenHeight,
    gap: 24,
    padding: 24,
  },
  progressContainer: {
    backgroundColor: COLORS.WHITE,
  },
  progressLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryText: {
    fontSize: 16,
    color: COLORS.GREEN,
    textDecorationLine: 'underline',
  },
});
