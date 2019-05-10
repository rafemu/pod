import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';

// Components
import { TimerComponent } from './components/timer/timer.component';

// Vendor Modules
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Material Imports
import { MatInputModule } from '@angular/material';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { ProjectSortPipe } from './pipes/project-sort.pipe';
import { FileNameDirective } from './directives/file-name.directive';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AuthenticatedComponent } from './components/authenticated/authenticated.component';

// Routes Definition
const routes: Routes = [
  {
    path: 'auth',
    loadChildren:
      './modules/authentication/authentication.module#AuthenticationModule'
  },
  {
    path: '',
    component: AuthenticatedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'settings',
        loadChildren: './modules/settings/settings.module#SettingsModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'message',
        loadChildren: './modules/message/message.module#MessageModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'calendar',
        loadChildren: './modules/calendar/calendar.module#CalendarModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'project',
        loadChildren: './modules/project/project.module#ProjectModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'people',
        loadChildren: './modules/people/people.module#PeopleModule',
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    FileNameDirective,
    AuthenticatedComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HttpClientModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBottomSheetModule,
    MatSelectModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
