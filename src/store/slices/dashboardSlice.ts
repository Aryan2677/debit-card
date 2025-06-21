import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface UserData {
  id: number;
  name: string;
  availableBalance: number;
  currency: string;
}

interface DebitCardData {
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

interface AddCardRequest {
  cardName: string;
}

interface DashboardState {
  userData: UserData | null;
  cards: DebitCardData[];
  activeCardIndex: number;
  loading: boolean;
  error: string | null;
  addingCard: boolean;
}

const initialState: DashboardState = {
  userData: null,
  cards: [],
  activeCardIndex: 0,
  loading: false,
  error: null,
  addingCard: false,
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    fetchUserDataRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchUserDataSuccess: (state, action: PayloadAction<UserData>) => {
      state.loading = false;
      state.userData = action.payload;
      state.error = null;
    },
    fetchUserDataFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    fetchCardsRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchCardsSuccess: (state, action: PayloadAction<DebitCardData[]>) => {
      state.loading = false;
      state.cards = action.payload;
      state.error = null;
    },
    fetchCardsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    addCardRequest: (state, action: PayloadAction<AddCardRequest>) => {
      state.addingCard = true;
      state.error = null;
    },
    addCardSuccess: (state, action: PayloadAction<DebitCardData>) => {
      state.addingCard = false;
      state.cards.push(action.payload);
      state.activeCardIndex = state.cards.length - 1;
      state.error = null;
    },
    addCardFailure: (state, action: PayloadAction<string>) => {
      state.addingCard = false;
      state.error = action.payload;
    },

    toggleCardFreezeRequest: (state, action: PayloadAction<number>) => {
      // Optimistic update - immediately toggle the freeze state
      const cardIndex = state.cards.findIndex(
        card => card.id === action.payload,
      );
      if (cardIndex !== -1) {
        state.cards[cardIndex].isFrozen = !state.cards[cardIndex].isFrozen;
      }
      state.error = null;
    },
    toggleCardFreezeSuccess: (
      state,
      action: PayloadAction<{cardId: number; isFrozen: boolean}>,
    ) => {
      // Success confirmation - state already updated optimistically
      state.error = null;
    },
    toggleCardFreezeFailure: (
      state,
      action: PayloadAction<{cardId: number; error: string}>,
    ) => {
      // Rollback the optimistic update on failure
      const cardIndex = state.cards.findIndex(
        card => card.id === action.payload.cardId,
      );
      if (cardIndex !== -1) {
        state.cards[cardIndex].isFrozen = !state.cards[cardIndex].isFrozen;
      }
      state.error = action.payload.error;
    },

    setActiveCard: (state, action: PayloadAction<number>) => {
      if (action.payload >= 0 && action.payload < state.cards.length) {
        state.activeCardIndex = action.payload;
      }
    },

    clearError: state => {
      state.error = null;
    },
  },
});

export const {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchUserDataFailure,
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCardRequest,
  addCardSuccess,
  addCardFailure,
  toggleCardFreezeRequest,
  toggleCardFreezeSuccess,
  toggleCardFreezeFailure,
  setActiveCard,
  clearError,
} = dashboardSlice.actions;
