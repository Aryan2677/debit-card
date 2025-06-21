import {configureStore} from '@reduxjs/toolkit';

// Use require for redux-saga to avoid import issues in React Native
const createSagaMiddleware = require('redux-saga').default;

// Import reducers
import {dashboardSlice} from './slices/dashboardSlice';
import {spendingLimitSlice} from './slices/spendingLimitSlice';

// Import sagas
import {dashboardSaga} from './sagas/dashboardSaga';
import {spendingLimitSaga} from './sagas/spendingLimitSaga';
import {all, fork} from 'redux-saga/effects';

// Combine all sagas into root saga
function* rootSaga() {
  yield all([fork(dashboardSaga), fork(spendingLimitSaga)]);
}

// Initialize saga middleware with error handling
let sagaMiddleware: any;
try {
  sagaMiddleware = createSagaMiddleware();
} catch (error) {
  console.error('Failed to create saga middleware:', error);
  throw new Error('Redux Saga initialization failed');
}

// Configure main Redux store
export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice.reducer,
    spendingLimit: spendingLimitSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: false, // Disable thunk since we're using saga
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(sagaMiddleware),
  devTools: __DEV__,
});

// Start saga middleware
sagaMiddleware.run(rootSaga);

// TypeScript types for store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
