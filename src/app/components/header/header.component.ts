import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCounterCount } from '../../store/counter/counter.selecetor';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  counterCount$: Observable<number>;

  constructor(private store: Store) {
    this.counterCount$ = this.store.select(selectCounterCount);
  }
}
