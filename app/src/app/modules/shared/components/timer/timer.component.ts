import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { timer } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  public startTime = moment().utc();
  public duration = moment.duration();
  private source = timer(1000, 1000);
  public timer;
  public isPaused: boolean = false;
  public isCollapsed: boolean = false;
  constructor(
    // public dialogRef: MatDialogRef<TimerComponent>,
    // @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    // this.dialogRef.updatePosition({ bottom: '25px', left: '25px' });
    this.source.subscribe(val => {
      if (this.isPaused === false) {
        this.duration.add(1, 'second');
      }
      this.timer = moment
        .utc(this.duration.as('milliseconds'))
        .format('HH:mm:ss');
    });
  }

  toggleTimer() {
    this.isPaused = !this.isPaused;
  }

  markStart() {

    // const data = {
    //   projectId : this.data.projectId,
    //   taskId : this.data.taskId,
    //   startTime : this.startTime,
    //   duration : this.duration,
    // };

  }




}
