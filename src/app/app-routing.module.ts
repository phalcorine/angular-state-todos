import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'counter', loadChildren: () => import('./counter/counter.module').then(m => m.CounterModule) },
  { path: 'todos', loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
