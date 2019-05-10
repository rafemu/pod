import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs';
import * as moment from 'moment';

type ContainerState = 'expanded' | 'condensed';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() index;
  public startTime = moment().utc();
  public duration = moment.duration();
  private source = timer(1000, 1000);
  public timer;
  public isPaused: boolean = false;
  public state: ContainerState = 'condensed';
  constructor() // public dialogRef: MatDialogRef<TimerComponent>,
  // @Inject(MAT_DIALOG_DATA) public data
  {}
  // TODO remove timer

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
