import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Modules
import { SharedModule } from './../shared/shared.module';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

// Pages
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { UpdateProfileComponent } from './pages/update-profile/update-profile.component';

// Routes Definition
const routes: Routes = [
  // { path: 'change-password', component: ChangePasswordComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'update-profile' }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatRadioModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ChangePasswordComponent, UpdateProfileComponent]
})
export class SettingsModule {}
