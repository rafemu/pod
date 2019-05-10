import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AddTaskComponent } from './../../components/add-task/add-task.component';
import { TaskList, Task } from './../../../../app.model';

import { TimeLogComponent } from './../../components/time-log/time-log.component';
import { AddFileComponent } from './../../components/add-file/add-file.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TaskService } from './../../../../services/task.service';
import { AlertService } from './../../../../services/alert.service';
import { ProjectService } from './../../../../services/project.service';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrls: ['./project-task.component.scss']
})
export class ProjectTaskComponent implements OnInit {
  public isAddFile: Boolean = false;
  public files = [];
  public taskFiles = [];
  public commentForm: FormGroup;
  public projectId: string;
  public timeLogs: Array<any> = [];
  public comments: Array<any> = [];

  public taskList: TaskList;
  public task: Task;
  public taskId: string;
  public time;
  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private alertService: AlertService,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.commentForm = this.fb.group({
      description: [null, Validators.required]
    });
    this.route.params.subscribe(params => {
      this.taskId = params.taskId;

      this.route.parent.params.subscribe(parentParams => {
        this.projectId = parentParams.projectId;
        this.getTask();
        this.getTime();
        this.getComment();
        this.getFiles();
      });
    });
  }

  public logTime() {
    this.dialog.open(TimeLogComponent, {
      height: '420px',
      width: '700px',
      data: { projectId: this.projectId, taskId: this.taskId }
    });
  }

  public startTimer() {
    try {
      this.taskService.startTimer(this.projectId, this.taskId);
    } catch (error) {
      alert(error.message);
    }
    // this.dialog.open(TimerComponent, {
    //   closeOnNavigation: false,
    //   disableClose: true,
    //   hasBackdrop: false,
    //   position: { bottom: '25px', left: '25px' },
    //   data: { projectId: this.projectId, taskId: this.taskId }
    // });
  }

  selectFiles(event) {
    this.files = Array.from(event.target.files);
  }

  /**
   * @description Upload Files
   */
  uploadFiles() {
    this.dialog.open(AddFileComponent, {
      height: '420px',
      width: '700px',
      data: { projectId: this.projectId, taskId: this.taskId }
    });
  }

  /**
   * Get the Time logs
   */
  public getTime() {
    this.taskService.getTaskTimeLogs(this.projectId, this.taskId).subscribe(
      timeLogs => {
        this.timeLogs = timeLogs;
        this.time = this.calculateTimelogs(this.timeLogs);
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public editTask() {
    // const editDialog = this.dialog.open(,)
    console.log('editTask', this.taskList, this.task, this.taskId);
    const addDialog = this.dialog.open(AddTaskComponent, {
      width: '700px',
      data: {
        projectId: this.projectId,
        taskListId: this.taskList.id,
        task: this.task
      }
    });
  }

  public calculateTimelogs(timeLogs) {
    let billableTime = 0;
    let nonBillabletime = 0;

    for (let i = 0; i < timeLogs.length; i++) {
      if (timeLogs[i].isBillable == true) {
        const difference = this.projectService.calculateTimeDifference(
          timeLogs[i].from,
          timeLogs[i].to
        );
        billableTime = billableTime + difference;
      } else {
        const difference = this.projectService.calculateTimeDifference(
          timeLogs[i].from,
          timeLogs[i].to
        );
        nonBillabletime = nonBillabletime + difference;
      }
    }
    const totalTime = billableTime + nonBillabletime;

    return {
      billableTime: billableTime.toFixed(2),
      nonBillabletime: nonBillabletime.toFixed(2),
      totalTime: totalTime.toFixed(2)
    };
  }

  /**
   * Posts the Comment
   * @param form FormDirective
   */
  public async postComment(form) {
    try {
      if (form.invalid) {
        return false;
        // throw new Error(`You shouldn't leave the comment field like that`);
      }
      const data = form.value;
      data.taskId = this.taskId;
      data.projectId = this.projectId;
      this.taskService.addComment(data);
      form.resetForm();
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }

  public getComment() {
    this.taskService.getComments(this.projectId, this.taskId).subscribe(
      comments => {
        this.comments = comments;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public getTask() {
    this.taskService.getTaskDetail(this.projectId, this.taskId).subscribe(
      task => {
        this.task = task;
        this.getTaskList(this.task.taskListId);
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }
  public getTaskList(taskListId) {
    this.taskService.getTaskListDetail(this.projectId, taskListId).subscribe(
      taskList => {
        this.taskList = taskList;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  private getFiles() {
    this.projectService.getTaskFiles(this.projectId, this.taskId).subscribe(
      files => {
        this.taskFiles = files;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }
}
