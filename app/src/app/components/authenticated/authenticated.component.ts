import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../services/task.service';

@Component({
  selector: 'app-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  public timers = [];
  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.activeTimers.subscribe(timers => {
      console.log(timers);
      this.timers = timers;
    });
  }
}
