import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Counter } from '../../models/counter.model';


@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  counters: Counter[] = [];
  counterCount: number = 0;
  addCounter(): void {
    // Generate a random number between 1 and 30 for new counters
    const randomValue = Math.floor(Math.random() * 30) + 1;
    this.counters.push({ id: Date.now(), value: randomValue });
  }

  resetCounters(): void {
    this.counters = [];
  }

  deleteCounter(id: number): void {
    this.counters = this.counters.filter(counter => counter.id !== id);
  }

  incrementCounter(id: number): void {
    this.counters = this.counters.map(counter =>
      counter.id === id ? { ...counter, value: counter.value + 1 } : counter
    );
  }
  decrementCounter(id: number): void {
    this.counters = this.counters.map(counter =>
      counter.id === id ? { ...counter, value: counter.value - 1 } : counter
    );
  }

}
