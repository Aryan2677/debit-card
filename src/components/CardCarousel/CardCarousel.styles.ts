import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../constants/colors';
import {Fonts} from '../../assets/fonts';

const {width} = Dimensions.get('window');
const DASHBOARD_PADDING = 24;
const CARD_WIDTH = width - DASHBOARD_PADDING * 2;
const CARD_SPACING = 20;

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  scrollContainer: {},
  cardContainer: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
  },
  lastCardContainer: {
    marginRight: 0,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 40,
    backgroundColor: COLORS.BG_GREEN,
    borderRadius: 12,
    marginHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    color: COLORS.TEXT_GRAY,
    marginBottom: 8,
    fontFamily: Fonts.AvenirNextDemi,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.TEXT_GRAY,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    fontFamily: Fonts.AvenirNextRegular,
  },
  addFirstCardButton: {
    backgroundColor: COLORS.BLUE,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addFirstCardButtonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontFamily: Fonts.AvenirNextDemi,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.BORDER,
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: COLORS.BLUE,
    width: 24,
    borderRadius: 4,
  },
  cardCounter: {
    alignItems: 'center',
    marginBottom: 16,
  },
  cardCounterText: {
    fontSize: 12,
    color: COLORS.TEXT_GRAY,
    fontFamily: Fonts.AvenirNextRegular,
  },
  addCardButton: {
    backgroundColor: COLORS.WHITE,
    borderWidth: 2,
    borderColor: COLORS.BLUE,
    borderStyle: 'dashed',
    paddingVertical: 16,
    marginHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCardButtonText: {
    color: COLORS.BLUE,
    fontSize: 16,
    fontFamily: Fonts.AvenirNextDemi,
  },
});
