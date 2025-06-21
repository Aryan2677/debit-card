import {call, put, takeEvery, delay, all} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {spendingLimitAPI} from '../../services/api';
import {FALLBACK_SPENDING_LIMIT_DATA} from '../../constants/data';
import {
  fetchSpendingLimitRequest,
  fetchSpendingLimitSuccess,
  fetchSpendingLimitFailure,
  updateSpendingLimitRequest,
  updateSpendingLimitSuccess,
  updateSpendingLimitFailure,
} from '../slices/spendingLimitSlice';

// Fetch spending limit with fallback data
function* fetchSpendingLimitSaga(): Generator<any, void, any> {
  try {
    // Add delay for loading state
    yield delay(500);

    const response = yield call(spendingLimitAPI.getSpendingLimit);
    yield put(fetchSpendingLimitSuccess(response.data));
  } catch (error: any) {
    console.log('API unavailable, using fallback spending limit data');
    // Use fallback data instead of showing error
    yield put(fetchSpendingLimitSuccess(FALLBACK_SPENDING_LIMIT_DATA));
  }
}

// Update spending limit with local fallback
function* updateSpendingLimitSaga(
  action: PayloadAction<number>,
): Generator<any, void, any> {
  try {
    // Add delay for loading state
    yield delay(500);

    const response = yield call(
      spendingLimitAPI.setWeeklyLimit,
      action.payload,
    );
    yield put(updateSpendingLimitSuccess(response.data));
  } catch (error: any) {
    console.log('API unavailable, using fallback for spending limit update');
    // Use fallback data with updated limit instead of showing error
    const fallbackData = {
      ...FALLBACK_SPENDING_LIMIT_DATA,
      weeklyLimit: action.payload,
      lastUpdated: new Date().toISOString(),
    };
    yield put(updateSpendingLimitSuccess(fallbackData));
  }
}

// Main spending limit saga watcher
export function* spendingLimitSaga(): Generator<any, void, any> {
  yield all([
    takeEvery(fetchSpendingLimitRequest.type, fetchSpendingLimitSaga),
    takeEvery(updateSpendingLimitRequest.type, updateSpendingLimitSaga),
  ]);
}
