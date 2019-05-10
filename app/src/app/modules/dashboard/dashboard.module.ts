import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

// Modules
import { SharedModule } from './../shared/shared.module';

// Components
import { MainComponent } from './components/main/main.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { MyChatComponent } from './pages/my-chat/my-chat.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'activity', component: ActivityComponent },
      { path: 'chat', component: MyChatComponent },
      // { path: 'add', component: AddComponent },

      { path: '**', pathMatch: 'full', redirectTo: 'activity' }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MomentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ActivityComponent,
    MainComponent,
    MyChatComponent,
    ChatComponent
  ]
})
export class DashboardModule {}
