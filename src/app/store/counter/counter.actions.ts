import { createAction, props } from '@ngrx/store';

export const addCounter = createAction('[Counter] Add Counter');
export const removeCounter = createAction(
  '[Counter] Remove Counter',
  props<{ id: number }>()
);
export const resetCounters = createAction('[Counter] Reset Counters');
export const incrementCounter = createAction(
  '[Counter] Increment Counter',
  props<{ id: number }>()
);
export const decrementCounter = createAction(
  '[Counter] Decrement Counter',
  props<{ id: number }>()
);
