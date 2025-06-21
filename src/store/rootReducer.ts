import {combineReducers} from '@reduxjs/toolkit';
import {dashboardSlice} from './slices/dashboardSlice';
import {spendingLimitSlice} from './slices/spendingLimitSlice';

export const rootReducer = combineReducers({
  dashboard: dashboardSlice.reducer,
  spendingLimit: spendingLimitSlice.reducer,
});
