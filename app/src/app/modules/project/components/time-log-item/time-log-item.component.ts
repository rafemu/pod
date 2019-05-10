import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { take } from 'rxjs/operators';

// Services
import { AlertService } from './../../../../services/alert.service';
import { ProjectService } from './../../../../services/project.service';
import { AuthenticationService } from './../../../../services/authentication.service';
import { UserService } from './../../../../services/user.service';

import { TimeLogComponent } from './../../components/time-log/time-log.component';

@Component({
  selector: '[app-time-log-item]',
  templateUrl: './time-log-item.component.html',
  styleUrls: ['./time-log-item.component.scss']
})
export class TimeLogItemComponent implements OnInit {
  @Input()
  public log;
  public total;
  constructor(
    private alert: AlertService,
    private projectService: ProjectService,
    private userService: UserService,
    private auth: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.total = this.projectService.calculateTimeDifference(
      this.log.from,
      this.log.to
    );
    this.total = this.total.toFixed(2);
  }

  /**
   * Toggle the time as Billable
   */
  public async toggleBillable() {
    try {
      const user = this.auth.user;
      const userProfile = await this.userService
        .getCurrentUser()
        .pipe(take(1))
        .toPromise();

      if (userProfile['role'] == 'Administrator') {
      } else if (user.uid !== this.log.userId) {
        throw new Error(`You don't have the privilege to toggle this`);
      }
      this.log.isBillable = !this.log.isBillable;
      await this.projectService.updateBillableStatus(
        this.log.id,
        this.log.projectId,
        this.log.isBillable
      );
      this.alert.showSuccess(
        `Time marked as ${
          this.log.isBillable === true ? 'billable' : 'non billable'
        }`
      );
    } catch (error) {
      this.alert.showError(error.message);
    }
  }

  public editTime() {
    // this.dialog.open(TimeLogComponent)
    this.dialog.open(TimeLogComponent, {
      height: '420px',
      width: '700px',
      data: {
        projectId: this.log.projectId,
        taskId: this.log.taskId,
        log: this.log
      }
    });
  }
}
