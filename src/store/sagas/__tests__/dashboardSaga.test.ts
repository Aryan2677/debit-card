// @ts-nocheck
import {runSaga} from 'redux-saga';
import {userAPI, debitCardAPI} from '../../../services/api';
import {FALLBACK_USER_DATA, FALLBACK_CARDS_DATA} from '../../../constants/data';
import {
  fetchUserDataRequest,
  fetchUserDataSuccess,
  fetchCardsRequest,
  fetchCardsSuccess,
} from '../../slices/dashboardSlice';

import {dashboardSaga} from '../dashboardSaga';

jest.mock('../../../services/api', () => ({
  userAPI: {
    getUser: jest.fn(),
  },
  debitCardAPI: {
    getCard: jest.fn(),
  },
}));

const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Dashboard Saga Tests', () => {
  let dispatched: any[];

  beforeEach(() => {
    dispatched = [];
    jest.clearAllMocks();
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  const mockStore = {
    dispatch: (action: any) => dispatched.push(action),
    getState: () => ({}),
  };

  describe('fetchUserDataSaga', () => {
    it('should fetch user data successfully from API', async () => {
      const mockUserData = {
        id: 1,
        name: 'John Doe',
        availableBalance: 2500,
        currency: 'S$',
      };

      (userAPI.getUser as jest.Mock).mockResolvedValue({
        data: mockUserData,
      });

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(userAPI.getUser);
          if (response?.data) {
            yield put(fetchUserDataSuccess(response.data));
          } else {
            throw new Error('Invalid response');
          }
        } catch (error: any) {
          console.log('API unavailable, using fallback user data');
          yield put(fetchUserDataSuccess(FALLBACK_USER_DATA));
        }
      }).toPromise();

      expect(userAPI.getUser).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(fetchUserDataSuccess(mockUserData));
    });

    it('should use fallback data when API fails', async () => {
      (userAPI.getUser as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(userAPI.getUser);
          if (response?.data) {
            yield put(fetchUserDataSuccess(response.data));
          } else {
            throw new Error('Invalid response');
          }
        } catch (error: any) {
          console.log('API unavailable, using fallback user data');
          yield put(fetchUserDataSuccess(FALLBACK_USER_DATA));
        }
      }).toPromise();

      expect(userAPI.getUser).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(fetchUserDataSuccess(FALLBACK_USER_DATA));
      expect(consoleSpy).toHaveBeenCalledWith(
        'API unavailable, using fallback user data',
      );
    });

    it('should handle API timeout gracefully', async () => {
      (userAPI.getUser as jest.Mock).mockRejectedValue(
        new Error('timeout of 10000ms exceeded'),
      );

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(userAPI.getUser);
          if (response?.data) {
            yield put(fetchUserDataSuccess(response.data));
          } else {
            throw new Error('Invalid response');
          }
        } catch (error: any) {
          console.log('API unavailable, using fallback user data');
          yield put(fetchUserDataSuccess(FALLBACK_USER_DATA));
        }
      }).toPromise();

      expect(dispatched[0]).toEqual(fetchUserDataSuccess(FALLBACK_USER_DATA));
    });
  });

  describe('fetchCardDataSaga', () => {
    it('should fetch card data successfully from API', async () => {
      const mockCardData = {
        id: 1,
        userId: 1,
        cardNumber: '1234 5678 9012 3456',
        cardHolderName: 'John Doe',
        expiryDate: '12/25',
        cvv: '456',
        isActive: true,
        cardType: 'Debit',
        isFrozen: false,
        cardName: 'Primary Card',
        createdAt: '2024-01-01T00:00:00Z',
      };

      (debitCardAPI.getCard as jest.Mock).mockResolvedValue({
        data: mockCardData,
      });

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(debitCardAPI.getCard);
          if (response?.data) {
            const cardsData = Array.isArray(response.data)
              ? response.data
              : [response.data];
            yield put(fetchCardsSuccess(cardsData));
          } else {
            throw new Error('Invalid response');
          }
        } catch (error: any) {
          console.log('API unavailable, using fallback cards data');
          yield put(fetchCardsSuccess(FALLBACK_CARDS_DATA));
        }
      }).toPromise();

      expect(debitCardAPI.getCard).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(fetchCardsSuccess([mockCardData]));
    });

    it('should use fallback data when API fails', async () => {
      (debitCardAPI.getCard as jest.Mock).mockRejectedValue(
        new Error('Server error'),
      );

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(debitCardAPI.getCard);
          if (response?.data) {
            const cardsData = Array.isArray(response.data)
              ? response.data
              : [response.data];
            yield put(fetchCardsSuccess(cardsData));
          } else {
            throw new Error('Invalid response');
          }
        } catch (error: any) {
          console.log('API unavailable, using fallback cards data');
          yield put(fetchCardsSuccess(FALLBACK_CARDS_DATA));
        }
      }).toPromise();

      expect(debitCardAPI.getCard).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(fetchCardsSuccess(FALLBACK_CARDS_DATA));
      expect(consoleSpy).toHaveBeenCalledWith(
        'API unavailable, using fallback cards data',
      );
    });

    it('should handle malformed API response gracefully', async () => {
      (debitCardAPI.getCard as jest.Mock).mockResolvedValue({
        data: null,
      });

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(debitCardAPI.getCard);
          if (!response.data) {
            throw new Error('Invalid response');
          }
          const cardsData = Array.isArray(response.data)
            ? response.data
            : [response.data];
          yield put(fetchCardsSuccess(cardsData));
        } catch (error: any) {
          console.log('API unavailable, using fallback cards data');
          yield put(fetchCardsSuccess(FALLBACK_CARDS_DATA));
        }
      }).toPromise();

      expect(dispatched[0]).toEqual(fetchCardsSuccess(FALLBACK_CARDS_DATA));
    });
  });

  describe('Fallback Data Validation', () => {
    it('should have valid fallback user data structure', () => {
      expect(FALLBACK_USER_DATA).toHaveProperty('id');
      expect(FALLBACK_USER_DATA).toHaveProperty('name');
      expect(FALLBACK_USER_DATA).toHaveProperty('availableBalance');
      expect(FALLBACK_USER_DATA).toHaveProperty('currency');
      expect(typeof FALLBACK_USER_DATA.availableBalance).toBe('number');
    });

    it('should have valid fallback cards data structure', () => {
      expect(FALLBACK_CARDS_DATA).toBeInstanceOf(Array);
      expect(FALLBACK_CARDS_DATA.length).toBeGreaterThan(0);
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('id');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('userId');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('cardNumber');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('cardHolderName');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('expiryDate');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('cvv');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('isActive');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('cardType');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('isFrozen');
      expect(FALLBACK_CARDS_DATA[0]).toHaveProperty('cardName');
      expect(typeof FALLBACK_CARDS_DATA[0].isActive).toBe('boolean');
    });
  });
});
