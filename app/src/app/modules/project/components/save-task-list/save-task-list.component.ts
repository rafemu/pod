import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Services
import { TaskService } from './../../../../services/task.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-save-task-list',
  templateUrl: './save-task-list.component.html',
  styleUrls: ['./save-task-list.component.scss']
})
export class SaveTaskListComponent implements OnInit {
  public saveTaskListForm: FormGroup;
  public projectId;
  public taskList;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialogRef: MatDialogRef<SaveTaskListComponent>,
    private taskService: TaskService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.saveTaskListForm = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      notes: [null, Validators.required]
    });
    this.projectId = this.data.projectId;
    if (this.data.taskList) {
      this.taskList = this.data.taskList;
      this.saveTaskListForm.patchValue(this.taskList);
    }
  }

  /**
   * Save the Task List
   * @param form FormGroup
   */
  public async saveTaskList(form) {
    try {
      const taskList = form.value;
      taskList.projectId = this.projectId;
      if (form.invalid) {
        return false;
      }
      await this.taskService.saveTaskList(taskList);
      this.alertService.showSuccess('Task list added');
      this.dialogRef.close();
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }
}
