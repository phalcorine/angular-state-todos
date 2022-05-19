import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CounterModule } from './counter/counter.module';
import { AppState } from './state/app.state';
import { fromCounter } from './state/counter/reducers';
import { fromTodos } from './state/todos/reducers';
import { EffectsModule } from '@ngrx/effects';
import { TodosEffects } from './state/todos/effects/todos.effects';
import { fromNotification } from './state/notification/reducers';
import { NotificationEffects } from './state/notification/effects/notification.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<AppState>({
      counter: fromCounter.counterReducer,
      todos: fromTodos.todosReducer,
      notification: fromNotification.notificationReducer,
    }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production, autoPause: true }),
    CounterModule,
    EffectsModule.forRoot([TodosEffects, NotificationEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
