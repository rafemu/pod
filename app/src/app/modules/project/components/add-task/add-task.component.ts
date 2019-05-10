import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { Project } from './../../../../app.model';

// Services
import { ProjectService } from './../../../../services/project.service';
import { TaskService } from './../../../../services/task.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  // @Input()
  projectId: string;
  // @Input()
  taskListId: string;
  public project: Project;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isAdding: Boolean = false;

  public members = [];

  constructor(
    public dialogRef: MatDialogRef<AddTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _formBuilder: FormBuilder,
    private taskService: TaskService,
    private alertService: AlertService,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.projectId = this.data.projectId;
    this.taskListId = this.data.taskListId;

    this.projectService.get(this.projectId).subscribe(project => {
      this.project = project;
    });
    this.firstFormGroup = this._formBuilder.group({
      title: ['', Validators.required],
      description: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      people: [null, Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      startDate: [null],
      deadline: [null]
    });

    if (this.data.task) {
      this.populateForm(this.data.task);
    }

    this.getMembers();
  }

  /**
   * Populate the Form with
   * task data
   * @param task Task
   */
  private populateForm(task) {
    this.firstFormGroup.controls.title.setValue(task.title);
    this.firstFormGroup.controls.description.setValue(task.description);
    this.secondFormGroup.controls.people.setValue(task.people);
    if (task.deadline) {
      this.thirdFormGroup.controls.deadline.setValue(
        moment.unix(task.deadline.seconds).toDate()
      );
    }
    if (task.startDate) {
      this.thirdFormGroup.controls.startDate.setValue(
        moment.unix(task.startDate.seconds).toDate()
      );
    }
  }

  public getMembers() {
    this.projectService.getPeople(this.projectId).subscribe(
      people => {
        this.members = people;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public addTask() {
    if (
      this.firstFormGroup.invalid ||
      this.secondFormGroup.invalid ||
      this.thirdFormGroup.invalid
    ) {
      return false;
    }

    const data = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value
    };
    data.projectId = this.projectId;
    data.taskListId = this.taskListId;

    if (this.data.parentTaskId) {
      data.parentTaskId = this.data.parentTaskId;
    }

    if (this.data.task) {
      data.id = this.data.task.id;
    } else {
      data.status = 'todo';
    }

    try {
      if (data.startDate && data.deadline) {
        if (moment(data.deadline).diff(moment(data.startDate)) < 0) {
          throw new Error(
            'Deadline should be greater than or equal to start date'
          );
        }
      }

      this.isAdding = true;
      this.validateForm(data);
      this.taskService.add(data);
      this.isAdding = false;
      this.alertService.showSuccess('Task saved');
      this.dialogRef.close();
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }

  public addPerson(personId) {
    const existingPeoples = this.secondFormGroup.get('people').value || [];
    const index = existingPeoples.findIndex(id => id === personId);
    if (index > -1) {
      existingPeoples.splice(index, 1);
    } else {
      existingPeoples.push(personId);
    }
    this.secondFormGroup.get('people').setValue(existingPeoples);
  }

  /**
   * Validate the form
   * @param form FormGroup
   */
  private validateForm(form) {
    if (form.invalid) {
      throw new Error('Oh! Oh! Please fill the fields');
    }
  }

  close() {
    this.dialogRef.close();
  }
}
