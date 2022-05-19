import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from './counter.component';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: CounterComponent },
];

@NgModule({
  declarations: [
    CounterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class CounterModule { }
