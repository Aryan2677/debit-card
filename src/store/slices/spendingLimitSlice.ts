import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface SpendingLimitData {
  id: number;
  userId: number;
  weeklyLimit: number;
  currentSpending: number;
  isActive: boolean;
  lastUpdated: string;
}

interface SpendingLimitState {
  data: SpendingLimitData | null;
  loading: boolean;
  error: string | null;
  updating: boolean;
}

const initialState: SpendingLimitState = {
  data: null,
  loading: false,
  error: null,
  updating: false,
};

export const spendingLimitSlice = createSlice({
  name: 'spendingLimit',
  initialState,
  reducers: {
    // Fetch Spending Limit Actions
    fetchSpendingLimitRequest: state => {
      state.loading = true;
      state.error = null;
    },
    fetchSpendingLimitSuccess: (
      state,
      action: PayloadAction<SpendingLimitData>,
    ) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    fetchSpendingLimitFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Update Spending Limit Actions
    updateSpendingLimitRequest: (state, action: PayloadAction<number>) => {
      state.updating = true;
      state.error = null;
    },
    updateSpendingLimitSuccess: (
      state,
      action: PayloadAction<SpendingLimitData>,
    ) => {
      state.updating = false;
      state.data = action.payload;
      state.error = null;
    },
    updateSpendingLimitFailure: (state, action: PayloadAction<string>) => {
      state.updating = false;
      state.error = action.payload;
    },

    // Clear Error
    clearError: state => {
      state.error = null;
    },
  },
});

export const {
  fetchSpendingLimitRequest,
  fetchSpendingLimitSuccess,
  fetchSpendingLimitFailure,
  updateSpendingLimitRequest,
  updateSpendingLimitSuccess,
  updateSpendingLimitFailure,
  clearError,
} = spendingLimitSlice.actions;
