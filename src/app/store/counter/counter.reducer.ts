import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counter.actions';

export interface Counter {
  id: number;
  count: number;
}

export const initialState: Counter[] = [];

let nextId = 1;

export const counterReducer = createReducer(
  initialState,
  on(CounterActions.addCounter, (state) => [
    ...state,
    { id: nextId++, count: 0 },
  ]),
  on(CounterActions.removeCounter, (state, { id }) =>
    state.filter((c) => c.id !== id)
  ),
  on(CounterActions.resetCounters, () => []),
  on(CounterActions.incrementCounter, (state, { id }) =>
    state.map((c) => (c.id === id ? { ...c, count: c.count + 1 } : c))
  ),
  on(CounterActions.decrementCounter, (state, { id }) =>
    state.map((c) => (c.id === id ? { ...c, count: c.count - 1 } : c))
  )
);
