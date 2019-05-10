import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MomentModule } from 'ngx-moment';
import { QuillModule } from 'ngx-quill';

// Modules
import { SharedModule } from './../shared/shared.module';

// Guards
import { RoleGuard } from './../../guards/role.guard';

// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSelectModule } from '@angular/material/select'

// Components
import { AddComponent } from './pages/add/add.component';
import { ListComponent } from './pages/list/list.component';
import { ProjectMainComponent } from './components/project-main/project-main.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ManageComponent } from './pages/manage/manage.component';
import { ProjectOverviewComponent } from './pages/project-overview/project-overview.component';
import { ProjectTasksComponent } from './pages/project-tasks/project-tasks.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ProjectTaskComponent } from './pages/project-task/project-task.component';
import { TimeLogComponent } from './components/time-log/time-log.component';
import { ProjectChatComponent } from './pages/project-chat/project-chat.component';
import { ProjectNotebooksComponent } from './pages/project-notebooks/project-notebooks.component';
import { ProjectTimeComponent } from './pages/project-time/project-time.component';
import { AddTaskListComponent } from './components/add-task-list/add-task-list.component';
import { ProjectAddNotebookComponent } from './pages/project-add-notebook/project-add-notebook.component';
import { ProjectFilesComponent } from './pages/project-files/project-files.component';
import { ProjectSettingsComponent } from './pages/project-settings/project-settings.component';
import { ProjectReportsComponent } from './pages/project-reports/project-reports.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ProjectNotebookDetailComponent } from './pages/project-notebook-detail/project-notebook-detail.component';
import { TimeLogItemComponent } from './components/time-log-item/time-log-item.component';
import { AddFileComponent } from './components/add-file/add-file.component';
import { ProjectGridItemComponent } from './components/project-grid-item/project-grid-item.component';
import { SaveTaskListComponent } from './components/save-task-list/save-task-list.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { UpsertCommentComponent } from './components/upsert-comment/upsert-comment.component';
import { BillingComponent } from './pages/billing/billing.component';
import { BottomSheetInvoice } from './pages/billing/billing.component';
import { UpsertInvoiceComponent } from './components/upsert-invoice/upsert-invoice.component';
import { UpsertExpenseComponent } from './components/upsert-expense/upsert-expense.component';
import { ViewInvoiceComponent } from './components/view-invoice/view-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectMainComponent,
    children: [
      { path: 'list/:status', component: ListComponent },
      { path: 'add', component: AddComponent },
      {
        path: 'manage/:projectId',
        component: ManageComponent,
        children: [
          { path: 'overview', component: ProjectOverviewComponent },
          { path: 'tasks', component: ProjectTasksComponent },
          { path: 'tasks/:taskId', component: ProjectTaskComponent },
          { path: 'chat', component: ProjectChatComponent },
          { path: 'billing', component: BillingComponent },
          { path: 'files', component: ProjectFilesComponent },
          { path: 'diaries', component: ProjectNotebooksComponent },
          { path: 'diaries/add', component: ProjectAddNotebookComponent },
          {
            path: 'diaries/edit/:notebookId',
            component: ProjectAddNotebookComponent
          },
          {
            path: 'diaries/:notebookId',
            component: ProjectNotebookDetailComponent
          },
          { path: 'time', component: ProjectTimeComponent },
          { path: 'reports', component: ProjectReportsComponent },
          {
            path: 'settings',
            component: ProjectSettingsComponent,
            canActivate: [RoleGuard],
            data: {
              roles: ['Administrator', 'Manager'],
              redirectPath: 'dashboard/activity'
            }
          },
          { path: '**', pathMatch: 'full', redirectTo: 'overview' }
        ]
      },
      { path: '**', pathMatch: 'full', redirectTo: 'list/active' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatStepperModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatBottomSheetModule,
    MatSelectModule,
    NgxMaterialTimepickerModule.forRoot(),
    MomentModule,
    MatMenuModule,
    ReactiveFormsModule,
    QuillModule,
    FormsModule,
    RouterModule.forChild(routes),
    DragAndDropModule
  ],
  declarations: [
    ListComponent,
    ProjectMainComponent,
    ProjectItemComponent,
    AddComponent,
    ManageComponent,
    ProjectOverviewComponent,
    ProjectTasksComponent,
    AddTaskComponent,
    ProjectTaskComponent,
    TimeLogComponent,
    ProjectChatComponent,
    ProjectNotebooksComponent,
    ProjectTimeComponent,
    AddTaskListComponent,
    ProjectAddNotebookComponent,
    ProjectFilesComponent,
    ProjectSettingsComponent,
    ProjectReportsComponent,
    TasksComponent,
    ProjectNotebookDetailComponent,
    TimeLogItemComponent,
    AddFileComponent,
    ProjectGridItemComponent,
    SaveTaskListComponent,
    TasksListComponent,
    UpsertCommentComponent,
    BillingComponent,
    BottomSheetInvoice,
    UpsertInvoiceComponent,
    UpsertExpenseComponent,
    ViewInvoiceComponent,
  ],
  entryComponents: [
    TimeLogComponent,
    AddFileComponent,
    AddTaskComponent,
    SaveTaskListComponent,
    UpsertCommentComponent,
    UpsertInvoiceComponent,
    UpsertExpenseComponent,
    ViewInvoiceComponent,
    BottomSheetInvoice
  ]
})
export class ProjectModule { }
