import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { CounterActions } from '../state/counter/actions';

@Component({
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  count: number = 0;

  constructor(private readonly store: Store<AppState>) { }

  ngOnInit(): void {
    this.store.select('counter')
      .subscribe({
        next: (counterState) => this.count = counterState.count
      });
  }

  increment() {
    this.store.dispatch(CounterActions.increment());
  }

  decrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  reset() {
    this.store.dispatch(CounterActions.reset());
  }

}
