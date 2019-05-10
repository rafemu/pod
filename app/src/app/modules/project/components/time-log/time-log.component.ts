import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';

// Services
import { TaskService } from './../../../../services/task.service';
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';
import { UserService } from './../../../../services/user.service';

@Component({
  selector: 'app-time-log',
  templateUrl: './time-log.component.html',
  styleUrls: ['./time-log.component.scss']
})
export class TimeLogComponent implements OnInit {
  public timeLogForm: FormGroup;
  public isAdding: Boolean = false;
  public projectUsers: Array<any> = [];
  public isAdmin: Boolean = false;
  constructor(
    public dialogRef: MatDialogRef<TimeLogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private taskService: TaskService,
    private alertService: AlertService,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.timeLogForm = this.fb.group({
      id: [null],
      date: [new Date(), Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      isBillable: [true],
      description: [null],
      userId: [null]
    });

    if (this.data.log) {
      this.populateTimeLog(this.data.log);
    }
    this.getProjectUsers();
    this.getUser();
  }

  private getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        console.log('user', user);
        this.isAdmin = user['role'] === 'Administrator';
        if (this.isAdmin) {
          this.dialogRef.updateSize('700px', '475px');
        } else {
          this.dialogRef.updateSize('700px', '420px');
        }
      }
    });
  }

  public populateTimeLog(log) {
    const timeLog = { ...log };
    if (typeof timeLog.date.getMonth !== 'function') {
      timeLog.date = moment.unix(timeLog.date.seconds).toDate();
    }
    this.timeLogForm.patchValue(timeLog);
  }

  public getProjectUsers = () => {
    this.projectService
      .getPeople(this.data.projectId)
      .subscribe(people => (this.projectUsers = people));
  };

  public async addTimeLog(form: FormGroup) {
    try {
      if (this.timeLogForm.invalid) {
        throw new Error('Please fill the required fields');
      }

      this.isAdding = true;

      const diff = this.projectService.calculateTimeDifference(
        this.timeLogForm.controls.from.value,
        this.timeLogForm.controls.to.value
      );

      if (diff <= 0) {
        throw new Error('End time should be greater than Start time');
      }

      const time = this.timeLogForm.value;
      time.projectId = this.data.projectId;
      time.taskId = this.data.taskId;
      await this.taskService.addTimeLog(time);
      this.isAdding = false;
      this.alertService.showSuccess('Time log saved');
      this.dialogRef.close();
    } catch (error) {
      this.isAdding = false;
      this.alertService.showError(error.message);
    }
  }
}
