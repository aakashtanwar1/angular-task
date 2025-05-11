import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  addCounter,
  removeCounter,
  resetCounters,
  incrementCounter,
  decrementCounter,
} from '../../store/counter/counter.actions';
import { selectCounters } from '../../store/counter/counter.selecetor';
import { Counter } from '../../store/counter/counter.reducer';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  counters$: Observable<Counter[]> = this.store.select(selectCounters);

  constructor(private store: Store) {}

  addCounter() {
    this.store.dispatch(addCounter());
  }

  removeCounter(id: number) {
    this.store.dispatch(removeCounter({ id }));
  }

  reset() {
    this.store.dispatch(resetCounters());
  }

  increment(id: number) {
    this.store.dispatch(incrementCounter({ id }));
  }

  decrement(id: number) {
    this.store.dispatch(decrementCounter({ id }));
  }
}
