import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule as AngularCalendarModule } from 'angular-calendar';
import { SharedModule } from './../shared/shared.module';

import { IndexComponent } from './pages/index/index.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: '**',
    pathMatch: 'exact',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [IndexComponent, MainComponent],
  imports: [
    CommonModule,
    AngularCalendarModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CalendarModule {}
