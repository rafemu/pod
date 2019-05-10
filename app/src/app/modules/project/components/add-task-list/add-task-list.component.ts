import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { TaskService } from './../../../../services/task.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-add-task-list',
  templateUrl: './add-task-list.component.html',
  styleUrls: ['./add-task-list.component.scss']
})
export class AddTaskListComponent implements OnInit {
  @Input()
  projectId: string;
  @Output()
  public closeTaskListComponent = new EventEmitter();

  public addTaskListForm: FormGroup;
  public isAdding: Boolean = false;

  constructor(
    private taskService: TaskService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.addTaskListForm = this.fb.group({
      title: [null, Validators.required]
    });
  }

  public addTaskList(form) {
    try {
      const taskList = form.value;
      taskList.projectId = this.projectId;
      this.isAdding = true;
      this.validateForm(form);
      // this.taskService.addTaskList(taskList);
      this.isAdding = false;
      form.resetForm();
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }
  /**
   * Validate the form
   * @param form FormGroup
   */
  private validateForm(form) {
    if (form.invalid) {
      throw new Error('Please Enter valid input');
    }
  }

  public cancel() {
    this.closeTaskListComponent.emit(false);
  }
}
