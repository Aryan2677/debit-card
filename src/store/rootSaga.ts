import {all, fork} from 'redux-saga/effects';
import {dashboardSaga} from './sagas/dashboardSaga';
import {spendingLimitSaga} from './sagas/spendingLimitSaga';

// Combine all application sagas
export function* rootSaga() {
  yield all([fork(dashboardSaga), fork(spendingLimitSaga)]);
}
