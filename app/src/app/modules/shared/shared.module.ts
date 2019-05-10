import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentModule } from 'ngx-moment';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';

import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfileBadgeComponent } from './components/profile-badge/profile-badge.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { UserNameDirective } from './../../directives/user-name.directive';
import { UserAvatarDirective } from './../../directives/user-avatar.directive';
import { TaskNameDirective } from './../../directives/task-name.directive';
import { NotebookNameDirective } from './../../directives/notebook-name.directive';
import { ProjectNameDirective } from './../../directives/project-name.directive';

import { ActivityItemComponent } from './components/activity-item/activity-item.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { PromptComponent } from './components/prompt/prompt.component';
import { TimerComponent } from './components/timer/timer.component';

// Pipes
import { FilterPipe } from './../../pipes/filter.pipe';
import { ProjectSortPipe } from './../../pipes/project-sort.pipe';
import { MenuComponent } from './components/menu/menu.component';

const materialModules = [
  MatBottomSheetModule,
  MatToolbarModule,
  MatMenuModule,
  MatDialogModule,
  MatListModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatCheckboxModule
];

const necessaryModules = [ReactiveFormsModule, FormsModule, MomentModule];

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    ...materialModules,
    ...necessaryModules,
    RouterModule,
    PickerModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ProfileBadgeComponent,
    UserNameDirective,
    UserAvatarDirective,
    TaskNameDirective,
    NotebookNameDirective,
    ProjectNameDirective,
    ActivityItemComponent,
    AddCompanyComponent,
    PromptComponent,
    FilterPipe,
    ProjectSortPipe,
    MenuComponent,
    TimerComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ProfileBadgeComponent,
    ActivityItemComponent,
    UserNameDirective,
    UserAvatarDirective,
    TaskNameDirective,
    NotebookNameDirective,
    ProjectNameDirective,
    FilterPipe,
    ProjectSortPipe,
    ...materialModules,
    ...necessaryModules,
    PickerModule
  ],
  entryComponents: [AddCompanyComponent, PromptComponent, MenuComponent]
})
export class SharedModule {}
