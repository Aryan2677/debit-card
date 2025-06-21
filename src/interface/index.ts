import {NavigationProp, RouteProp} from '@react-navigation/native';

export interface DashboardProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export interface SpendingLimitProps {
  navigation: NavigationProp<any>;
  route: RouteProp<any>;
}

export type DebitCardStackParamList = {
  Dashboard: {newSpendingLimit?: number};
  SpendingLimit: {currentLimit?: number};
};

export interface SpendingProgressProps {
  currentSpending: number;
  spendingLimit: number;
}

export interface CardData {
  id: number;
  userId: number;
  cardHolderName: string;
  cardNumber: string;
  cvv: string;
  expiryDate: string;
  isActive: boolean;
  isFrozen: boolean;
  cardType: string;
  cardName: string;
  createdAt: string;
}

export interface AddCardModalProps {
  visible: boolean;
  onClose: () => void;
  onAddCard: (cardName: string) => void;
  isLoading?: boolean;
}

export interface DebitCardProps {
  cardHolderName?: string;
  cardNumber?: string;
  cardCVV?: string;
  cardExpiry?: string;
  cardName?: string;
  isFrozen?: boolean;
  onToggleFreeze?: () => void;
  cardType?: string;
}
