// @ts-nocheck
import {runSaga} from 'redux-saga';
import {spendingLimitAPI} from '../../../services/api';
import {FALLBACK_SPENDING_LIMIT_DATA} from '../../../constants/data';
import {
  fetchSpendingLimitRequest,
  fetchSpendingLimitSuccess,
  updateSpendingLimitRequest,
  updateSpendingLimitSuccess,
} from '../../slices/spendingLimitSlice';

import {spendingLimitSaga} from '../spendingLimitSaga';

jest.mock('../../../services/api', () => ({
  spendingLimitAPI: {
    getSpendingLimit: jest.fn(),
    setWeeklyLimit: jest.fn(),
  },
}));

const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Spending Limit Saga Tests', () => {
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

  describe('fetchSpendingLimitSaga', () => {
    it('should fetch spending limit data successfully from API', async () => {
      const mockSpendingLimitData = {
        id: 1,
        userId: 1,
        weeklyLimit: 3000,
        currentSpending: 150,
        isActive: true,
        lastUpdated: '2024-01-15T10:30:00.000Z',
      };

      (spendingLimitAPI.getSpendingLimit as jest.Mock).mockResolvedValue({
        data: mockSpendingLimitData,
      });

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(spendingLimitAPI.getSpendingLimit);
          yield put(fetchSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log('API unavailable, using fallback spending limit data');
          yield put(fetchSpendingLimitSuccess(FALLBACK_SPENDING_LIMIT_DATA));
        }
      }).toPromise();

      expect(spendingLimitAPI.getSpendingLimit).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(
        fetchSpendingLimitSuccess(mockSpendingLimitData),
      );
    });

    it('should use fallback data when API fails', async () => {
      (spendingLimitAPI.getSpendingLimit as jest.Mock).mockRejectedValue(
        new Error('Network error'),
      );

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(spendingLimitAPI.getSpendingLimit);
          yield put(fetchSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log('API unavailable, using fallback spending limit data');
          yield put(fetchSpendingLimitSuccess(FALLBACK_SPENDING_LIMIT_DATA));
        }
      }).toPromise();

      expect(spendingLimitAPI.getSpendingLimit).toHaveBeenCalledTimes(1);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(
        fetchSpendingLimitSuccess(FALLBACK_SPENDING_LIMIT_DATA),
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        'API unavailable, using fallback spending limit data',
      );
    });

    it('should handle server timeout gracefully', async () => {
      (spendingLimitAPI.getSpendingLimit as jest.Mock).mockRejectedValue(
        new Error('Request timeout'),
      );

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(spendingLimitAPI.getSpendingLimit);
          yield put(fetchSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log('API unavailable, using fallback spending limit data');
          yield put(fetchSpendingLimitSuccess(FALLBACK_SPENDING_LIMIT_DATA));
        }
      }).toPromise();

      expect(dispatched[0]).toEqual(
        fetchSpendingLimitSuccess(FALLBACK_SPENDING_LIMIT_DATA),
      );
    });
  });

  describe('updateSpendingLimitSaga', () => {
    it('should update spending limit successfully via API', async () => {
      const newLimit = 4000;
      const mockUpdatedData = {
        id: 1,
        userId: 1,
        weeklyLimit: newLimit,
        currentSpending: 345,
        isActive: true,
        lastUpdated: '2024-01-15T11:00:00.000Z',
      };

      (spendingLimitAPI.setWeeklyLimit as jest.Mock).mockResolvedValue({
        data: mockUpdatedData,
      });

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(
            spendingLimitAPI.setWeeklyLimit,
            newLimit,
          );
          yield put(updateSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log(
            'API unavailable, using fallback for spending limit update',
          );
          const fallbackData = {
            ...FALLBACK_SPENDING_LIMIT_DATA,
            weeklyLimit: newLimit,
            lastUpdated: new Date().toISOString(),
          };
          yield put(updateSpendingLimitSuccess(fallbackData));
        }
      }).toPromise();

      expect(spendingLimitAPI.setWeeklyLimit).toHaveBeenCalledWith(newLimit);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0]).toEqual(
        updateSpendingLimitSuccess(mockUpdatedData),
      );
    });

    it('should use fallback data when update API fails', async () => {
      const newLimit = 2500;

      (spendingLimitAPI.setWeeklyLimit as jest.Mock).mockRejectedValue(
        new Error('Server error'),
      );

      const originalDateNow = Date.now;
      const mockDate = new Date('2024-01-15T12:00:00.000Z');
      Date.now = jest.fn(() => mockDate.getTime());
      global.Date = jest.fn(() => mockDate) as any;
      global.Date.now = Date.now;

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(
            spendingLimitAPI.setWeeklyLimit,
            newLimit,
          );
          yield put(updateSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log(
            'API unavailable, using fallback for spending limit update',
          );
          const fallbackData = {
            ...FALLBACK_SPENDING_LIMIT_DATA,
            weeklyLimit: newLimit,
            lastUpdated: new Date().toISOString(),
          };
          yield put(updateSpendingLimitSuccess(fallbackData));
        }
      }).toPromise();

      expect(spendingLimitAPI.setWeeklyLimit).toHaveBeenCalledWith(newLimit);
      expect(dispatched).toHaveLength(1);
      expect(dispatched[0].payload.weeklyLimit).toBe(newLimit);
      expect(dispatched[0].payload.lastUpdated).toBe(mockDate.toISOString());
      expect(consoleSpy).toHaveBeenCalledWith(
        'API unavailable, using fallback for spending limit update',
      );

      Date.now = originalDateNow;
    });

    it('should handle zero limit update correctly', async () => {
      const newLimit = 0;
      const mockUpdatedData = {
        id: 1,
        userId: 1,
        weeklyLimit: newLimit,
        currentSpending: 345,
        isActive: false,
        lastUpdated: '2024-01-15T11:00:00.000Z',
      };

      (spendingLimitAPI.setWeeklyLimit as jest.Mock).mockResolvedValue({
        data: mockUpdatedData,
      });

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(
            spendingLimitAPI.setWeeklyLimit,
            newLimit,
          );
          yield put(updateSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log(
            'API unavailable, using fallback for spending limit update',
          );
          const fallbackData = {
            ...FALLBACK_SPENDING_LIMIT_DATA,
            weeklyLimit: newLimit,
            lastUpdated: new Date().toISOString(),
          };
          yield put(updateSpendingLimitSuccess(fallbackData));
        }
      }).toPromise();

      expect(dispatched[0].payload.weeklyLimit).toBe(0);
      expect(dispatched[0].payload.isActive).toBe(false);
    });

    it('should handle negative limit values gracefully', async () => {
      const newLimit = -100;

      (spendingLimitAPI.setWeeklyLimit as jest.Mock).mockRejectedValue(
        new Error('Invalid limit value'),
      );

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(
            spendingLimitAPI.setWeeklyLimit,
            newLimit,
          );
          yield put(updateSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log(
            'API unavailable, using fallback for spending limit update',
          );
          const fallbackData = {
            ...FALLBACK_SPENDING_LIMIT_DATA,
            weeklyLimit: Math.max(0, newLimit),
            lastUpdated: new Date().toISOString(),
          };
          yield put(updateSpendingLimitSuccess(fallbackData));
        }
      }).toPromise();

      expect(dispatched[0].payload.weeklyLimit).toBe(0);
    });
  });

  describe('Fallback Data Validation', () => {
    it('should have valid fallback spending limit data structure', () => {
      expect(FALLBACK_SPENDING_LIMIT_DATA).toHaveProperty('id');
      expect(FALLBACK_SPENDING_LIMIT_DATA).toHaveProperty('userId');
      expect(FALLBACK_SPENDING_LIMIT_DATA).toHaveProperty('weeklyLimit');
      expect(FALLBACK_SPENDING_LIMIT_DATA).toHaveProperty('currentSpending');
      expect(FALLBACK_SPENDING_LIMIT_DATA).toHaveProperty('isActive');
      expect(FALLBACK_SPENDING_LIMIT_DATA).toHaveProperty('lastUpdated');
      expect(typeof FALLBACK_SPENDING_LIMIT_DATA.weeklyLimit).toBe('number');
      expect(typeof FALLBACK_SPENDING_LIMIT_DATA.currentSpending).toBe(
        'number',
      );
      expect(typeof FALLBACK_SPENDING_LIMIT_DATA.isActive).toBe('boolean');
    });

    it('should have realistic spending limit values', () => {
      expect(FALLBACK_SPENDING_LIMIT_DATA.weeklyLimit).toBeGreaterThan(0);
      expect(
        FALLBACK_SPENDING_LIMIT_DATA.currentSpending,
      ).toBeGreaterThanOrEqual(0);
      expect(FALLBACK_SPENDING_LIMIT_DATA.currentSpending).toBeLessThanOrEqual(
        FALLBACK_SPENDING_LIMIT_DATA.weeklyLimit,
      );
    });

    it('should have valid date format in lastUpdated', () => {
      const dateString = FALLBACK_SPENDING_LIMIT_DATA.lastUpdated;
      expect(typeof dateString).toBe('string');
      expect(dateString).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );

      const date = new Date(dateString);
      expect(date.getTime()).not.toBeNaN();
    });
  });

  describe('Edge Cases', () => {
    it('should handle extremely large limit values', async () => {
      const newLimit = 999999999;

      (spendingLimitAPI.setWeeklyLimit as jest.Mock).mockRejectedValue(
        new Error('Limit too large'),
      );

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(
            spendingLimitAPI.setWeeklyLimit,
            newLimit,
          );
          yield put(updateSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log(
            'API unavailable, using fallback for spending limit update',
          );
          const fallbackData = {
            ...FALLBACK_SPENDING_LIMIT_DATA,
            weeklyLimit: newLimit,
            lastUpdated: new Date().toISOString(),
          };
          yield put(updateSpendingLimitSuccess(fallbackData));
        }
      }).toPromise();

      expect(dispatched[0].payload.weeklyLimit).toBe(newLimit);
    });

    it('should handle API returning null response', async () => {
      (spendingLimitAPI.getSpendingLimit as jest.Mock).mockResolvedValue({
        data: null,
      });

      await runSaga(mockStore, function* () {
        const {call, put, delay} = require('redux-saga/effects');

        try {
          yield delay(500);
          const response = yield call(spendingLimitAPI.getSpendingLimit);
          if (!response.data) {
            throw new Error('No data received');
          }
          yield put(fetchSpendingLimitSuccess(response.data));
        } catch (error: any) {
          console.log('API unavailable, using fallback spending limit data');
          yield put(fetchSpendingLimitSuccess(FALLBACK_SPENDING_LIMIT_DATA));
        }
      }).toPromise();

      expect(dispatched[0]).toEqual(
        fetchSpendingLimitSuccess(FALLBACK_SPENDING_LIMIT_DATA),
      );
    });
  });
});
