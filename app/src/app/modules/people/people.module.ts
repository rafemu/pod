import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Modules
import { SharedModule } from './../shared/shared.module';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

// Components
import { ListComponent } from './pages/list/list.component';
import { PeopleMainComponent } from './components/people-main/people-main.component';
import { PeopleItemComponent } from './components/people-item/people-item.component';
import { AddComponent } from './pages/add/add.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleMainComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'profile/:uId', component:ProfileComponent },
      // { path: 'add', component: AddComponent },
      { path: '**', pathMatch: 'full', redirectTo: 'list' }
    ]
  }
];

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListComponent, PeopleMainComponent, PeopleItemComponent, AddComponent, ProfileComponent]
})
export class PeopleModule {}
