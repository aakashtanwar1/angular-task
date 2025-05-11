import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Counter } from './counter.reducer';

export const selectCounters = createFeatureSelector<Counter[]>('counters');

export const selectCounterCount = createSelector(
  selectCounters,
  (counters) => counters.length
);
