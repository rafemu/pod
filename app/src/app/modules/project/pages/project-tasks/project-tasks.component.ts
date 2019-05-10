import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

// Components
import { AddTaskComponent } from './../../components/add-task/add-task.component';
import { SaveTaskListComponent } from './../../components/save-task-list/save-task-list.component';

// Services
import { TaskService } from './../../../../services/task.service';
import { UserService } from './../../../../services/user.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.scss']
})
export class ProjectTasksComponent implements OnInit {
  public user;
  public activeRoles = ['Administrator', 'Project Manager'];
  public view = 'list';
  public isAddTaskList: Boolean = false;
  public isLoadingTask: Boolean = false;
  public projectId: string;
  public tasks = [];
  public activeTaskLists = [];
  public completedTaskLists = [];
  public activeTaskList;
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const view = window.localStorage.getItem('taskView');
    if (view) this.view = view;
    this.userService.getCurrentUser().subscribe(user => {
      this.user = user;
    });
    this.route.parent.params.subscribe(params => {
      this.projectId = params.projectId;
      this.taskService.project = this.projectId;
      this.listTaskList();
    });
  }

  public list(taskListId) {
    this.taskService.list(taskListId).subscribe(tasks => {
      this.isLoadingTask = false;
      this.tasks = tasks;
    });
  }

  /**
   * Close the Task List Component
   * @param status Boolean
   */
  public closeTaskListComponent(status) {
    this.isAddTaskList = status;
  }

  public addTask() {
    if (this.activeTaskList.isCompleted === true) {
      this.alertService.showError(
        'Yikes! You cant add a task to one completed task list'
      );
      return;
    }

    const addDialog = this.dialog.open(AddTaskComponent, {
      width: '700px',
      data: { projectId: this.projectId, taskListId: this.activeTaskList.id }
    });
  }

  public addTaskList() {
    this.dialog.open(SaveTaskListComponent, {
      width: '400px',
      data: { projectId: this.projectId }
    });
  }

  public editTaskList() {
    this.dialog.open(SaveTaskListComponent, {
      width: '400px',
      data: { projectId: this.projectId, taskList: this.activeTaskList }
    });
  }

  public listTaskList() {
    this.taskService.getTaskLists().subscribe(taskLists => {
      this.completedTaskLists = [];
      this.activeTaskLists = [];
      taskLists.forEach(taskList => {
        if (taskList.isCompleted === true) {
          this.completedTaskLists.push(taskList);
        } else {
          this.activeTaskLists.push(taskList);
        }
      });

      if (this.activeTaskLists.length > 0) {
        this.selectTaskList(this.activeTaskLists[0]);
      } else {
        this.isLoadingTask = false;
      }
    });
  }

  /**
   * @description Select and set the task list
   * @author Sharan (Zweck)
   * @param taskListId string
   */
  public selectTaskList(taskList) {
    this.activeTaskList = taskList;
    this.isLoadingTask = true;
    this.list(this.activeTaskList.id);
  }

  /**
   * @description Toggle the Finished status
   * of a task list
   * @author Sharan (Zweck)
   */
  public async toggleFinished() {
    try {
      await this.taskService.toggleFinished(this.activeTaskList);
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }

  public setView(view) {
    this.view = view;
    window.localStorage.setItem('taskView', view);
  }
}
