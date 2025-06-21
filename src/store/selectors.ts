import {RootState} from './index';

// Dashboard Selectors
export const selectUserData = (state: RootState) => state.dashboard.userData;
export const selectCards = (state: RootState) => state.dashboard.cards;
export const selectActiveCard = (state: RootState) => {
  const {cards, activeCardIndex} = state.dashboard;
  return cards[activeCardIndex] || null;
};
export const selectDashboardLoading = (state: RootState) =>
  state.dashboard.loading;
export const selectDashboardError = (state: RootState) => state.dashboard.error;

// Spending Limit Selectors
export const selectSpendingLimitData = (state: RootState) =>
  state.spendingLimit.data;
export const selectSpendingLimitLoading = (state: RootState) =>
  state.spendingLimit.loading;
export const selectSpendingLimitUpdating = (state: RootState) =>
  state.spendingLimit.updating;
export const selectSpendingLimitError = (state: RootState) =>
  state.spendingLimit.error;

// Combined Selectors
export const selectIsLoading = (state: RootState) =>
  state.dashboard.loading || state.spendingLimit.loading;

export const selectHasError = (state: RootState) =>
  Boolean(state.dashboard.error || state.spendingLimit.error);

export const selectAllErrors = (state: RootState) =>
  state.dashboard.error || state.spendingLimit.error;
