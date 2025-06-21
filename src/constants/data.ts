import {
  menuItem1,
  menuItem2,
  menuItem3,
  menuItem4,
  menuItem5,
} from '../assets/images';
import {STRINGS} from './strings';

// Generate settings list data with dynamic card and spending limit info
export const getListData = (
  navigation: any,
  spendingLimit: number = 0,
  activeCard: any = null,
  onToggleFreeze: (cardId: number) => void = () => {},
  onToggleProgressBar: () => void = () => {},
  isProgressBarVisible: boolean = true,
) => [
  {
    id: '1',
    title: STRINGS.topUpAccount,
    description: STRINGS.topUpDescription,
    image: menuItem1,
  },
  {
    id: '2',
    title: STRINGS.weeklySpendingLimit,
    description:
      spendingLimit > 0
        ? `${STRINGS.spendingLimitSet}${spendingLimit.toLocaleString()}`
        : STRINGS.noSpendingLimit,
    image: menuItem2,
    isSwitch: spendingLimit > 0,
    switchValue: isProgressBarVisible,
    onSwitchPress: onToggleProgressBar,
    onPress: () => {
      navigation.navigate('SpendingLimit', {currentLimit: spendingLimit});
    },
  },
  {
    id: '3',
    title: STRINGS.freezeCard,
    description: activeCard?.isFrozen
      ? `${activeCard.cardName}${STRINGS.cardFrozen}`
      : `${activeCard?.cardName || STRINGS.yourDebitCard}${STRINGS.cardActive}`,
    image: menuItem3,
    isSwitch: true,
    switchValue: activeCard?.isFrozen || false,
    onSwitchPress: () => {
      if (activeCard?.id) {
        onToggleFreeze(activeCard.id);
      }
    },
    onPress: () => {
      if (activeCard?.id) {
        onToggleFreeze(activeCard.id);
      }
    },
  },
  {
    id: '4',
    title: STRINGS.getNewCard,
    description: STRINGS.getNewCardDescription,
    image: menuItem4,
  },
  {
    id: '5',
    title: STRINGS.deactivatedCards,
    description: STRINGS.deactivatedCardsDescription,
    image: menuItem5,
  },
];

// Fallback data for when API is not available
export const FALLBACK_USER_DATA = {
  id: 1,
  name: STRINGS.defaultCardHolder,
  availableBalance: 3000,
  currency: STRINGS.defaultCurrency,
};

export const FALLBACK_CARDS_DATA = [
  {
    id: 1,
    userId: 1,
    cardNumber: '5647 3411 2531 7834',
    cardHolderName: STRINGS.defaultCardHolder,
    expiryDate: '12/26',
    cvv: '123',
    isActive: true,
    isFrozen: false,
    cardType: 'Debit',
    cardName: 'Primary Card',
    createdAt: '2024-01-01T10:00:00.000Z',
  },
  {
    id: 2,
    userId: 1,
    cardNumber: '4532 1234 5678 9012',
    cardHolderName: STRINGS.defaultCardHolder,
    expiryDate: '08/27',
    cvv: '456',
    isActive: true,
    isFrozen: true,
    cardType: 'Debit',
    cardName: 'Travel Card',
    createdAt: '2024-01-15T14:30:00.000Z',
  },
  {
    id: 3,
    userId: 1,
    cardNumber: '6011 9876 5432 1098',
    cardHolderName: STRINGS.defaultCardHolder,
    expiryDate: '03/28',
    cvv: '789',
    isActive: true,
    isFrozen: false,
    cardType: 'Debit',
    cardName: 'Business Card',
    createdAt: '2024-02-01T09:15:00.000Z',
  },
];

// Keep the single card for backward compatibility
export const FALLBACK_CARD_DATA = FALLBACK_CARDS_DATA[0];

export const FALLBACK_SPENDING_LIMIT_DATA = {
  id: 1,
  userId: 1,
  weeklyLimit: 5000,
  currentSpending: 345,
  isActive: true,
  lastUpdated: '2024-01-15T10:30:00.000Z',
};
