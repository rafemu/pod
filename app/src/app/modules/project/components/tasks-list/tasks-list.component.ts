import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material';

// Components
import { TimeLogComponent } from './../../components/time-log/time-log.component';
import { UpsertCommentComponent } from './../../components/upsert-comment/upsert-comment.component';
import { AddFileComponent } from './../../components/add-file/add-file.component';
import { AddTaskComponent } from './../../components/add-task/add-task.component';

// Services
import { TaskService } from './../../../../services/task.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnInit, OnChanges {
  @Input()
  taskListId: string;
  @Input()
  projectId: string;
  public tasks = [];
  public projectTaskLists = [];
  constructor(
    private task: TaskService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {}
  ngOnChanges() {
    this.getTasks();
  }

  public getTasks() {
    this.task.list(this.taskListId).subscribe(
      tasks => {
        this.tasks = this.getNestedChildren(tasks, null);
        console.log(this.tasks);
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public logTime(taskId) {
    this.dialog.open(TimeLogComponent, {
      height: '420px',
      width: '700px',
      data: { projectId: this.projectId, taskId: taskId }
    });
  }

  public addComment(taskId) {
    this.dialog.open(UpsertCommentComponent, {
      height: '311px',
      width: '700px',
      data: { projectId: this.projectId, taskId: taskId }
    });
  }

  public editTask(task) {
    // console.log('editTask', this.taskList, this.task, this.taskId);
    const addDialog = this.dialog.open(AddTaskComponent, {
      width: '700px',
      data: {
        projectId: this.projectId,
        taskListId: task.taskListId,
        task: task
      }
    });
  }

  /**
   * @uses update the status of a task
   * @param task
   */
  public updateProgress(task) {
    delete task.showProgress;
    this.task.add(task);
  }

  /**
   * @uses mark a task as completed or not completed
   * @param task
   */
  public toggleCompleted(task) {
    if (task.isCompleted) {
      task.isCompleted = !task.isCompleted;
    } else {
      task.isCompleted = true;
    }
    delete task.showProgress;
    this.task.add(task);
  }

  /**
   * @description Upload Files
   */
  public uploadFiles(taskId) {
    this.dialog.open(AddFileComponent, {
      height: '420px',
      width: '700px',
      data: { projectId: this.projectId, taskId }
    });
  }

  public dateRange(taskId) {
    console.log('hey there');
  }

  /**
   * @author Sharan
   * @param taskList TaskList
   * @param task Task
   */
  public async moveTask(taskList, task) {
    try {
      task.taskListId = taskList.id;
      await this.task.add(task);
      this.alertService.showSuccess(`Task moved to list : ${taskList.title}`);
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }

  /**
   * @event MenuOpen
   * @author Sharan
   * @param event Event
   */
  public menuOpened(event) {
    this.task.getTaskLists().subscribe(taskLists => {
      this.projectTaskLists = taskLists;
    });
  }

  /**
   * Adds a subtask
   * @param task Task
   */
  public addSubtask(task) {
    const addDialog = this.dialog.open(AddTaskComponent, {
      width: '700px',
      data: {
        projectId: task.projectId,
        taskListId: task.taskListId,
        parentTaskId: task.id
      }
    });
  }

  /**
   * @description Converts list to hierarchy
   * @param arr [Task]
   * @param parentTaskId
   */
  private getNestedChildren(arr, parentTaskId) {
    var out = [];
    for (var i in arr) {
      if (arr[i].parentTaskId == parentTaskId) {
        var children = this.getNestedChildren(arr, arr[i].id);

        if (children.length) {
          arr[i].children = children;
        }
        out.push(arr[i]);
      }
    }
    return out;
  }
}
