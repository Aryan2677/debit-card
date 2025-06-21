import {call, put, takeEvery, delay, all} from 'redux-saga/effects';
import {PayloadAction} from '@reduxjs/toolkit';
import {userAPI, debitCardAPI} from '../../services/api';
import {FALLBACK_USER_DATA, FALLBACK_CARDS_DATA} from '../../constants/data';
import {createNewCard} from '../../utils/cardUtils';
import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchCardsRequest,
  fetchCardsSuccess,
  addCardRequest,
  addCardSuccess,
  toggleCardFreezeRequest,
  toggleCardFreezeSuccess,
  toggleCardFreezeFailure,
} from '../slices/dashboardSlice';

// Fetch user data with fallback on API failure
function* fetchUserDataSaga(): Generator<any, void, any> {
  try {
    yield delay(500);

    const response = yield call(userAPI.getUser);
    yield put(fetchUserDataSuccess(response.data));
  } catch (error: any) {
    console.log('API unavailable, using fallback user data');
    yield put(fetchUserDataSuccess(FALLBACK_USER_DATA));
  }
}

// Fetch cards data with array normalization and fallback
function* fetchCardsDataSaga(): Generator<any, void, any> {
  try {
    yield delay(500);

    const response = yield call(debitCardAPI.getCard);
    const cardsData = Array.isArray(response.data)
      ? response.data
      : [response.data];
    yield put(fetchCardsSuccess(cardsData));
  } catch (error: any) {
    console.log('API unavailable, using fallback cards data');
    yield put(fetchCardsSuccess(FALLBACK_CARDS_DATA));
  }
}

// Create new card with generated details
function* addCardSaga(
  action: PayloadAction<{cardName: string}>,
): Generator<any, void, any> {
  try {
    yield delay(500);

    const newCard = createNewCard(1, action.payload.cardName, 'Mark Henry');

    yield put(addCardSuccess(newCard));
  } catch (error: any) {
    console.log('API unavailable, creating card locally');
    const newCard = createNewCard(1, action.payload.cardName, 'Mark Henry');
    yield put(addCardSuccess(newCard));
  }
}

// Toggle card freeze with optimistic updates
function* toggleCardFreezeSaga(
  action: PayloadAction<number>,
): Generator<any, void, any> {
  const cardId = action.payload;

  try {
    // Simulate API call in background (no delay for better UX)
    // In a real app, this would be: yield call(debitCardAPI.toggleFreeze, cardId);

    // For now, just confirm the optimistic update was successful
    yield put(toggleCardFreezeSuccess({cardId, isFrozen: true})); // isFrozen value doesn't matter since we use optimistic updates
  } catch (error: any) {
    console.log('API call failed, rolling back optimistic update');
    yield put(
      toggleCardFreezeFailure({
        cardId,
        error: 'Failed to toggle freeze status',
      }),
    );
  }
}

// Main dashboard saga watcher
export function* dashboardSaga() {
  yield all([
    takeEvery(fetchUserDataRequest.type, fetchUserDataSaga),
    takeEvery(fetchCardsRequest.type, fetchCardsDataSaga),
    takeEvery(addCardRequest.type, addCardSaga),
    takeEvery(toggleCardFreezeRequest.type, toggleCardFreezeSaga),
  ]);
}
