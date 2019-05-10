import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

// Services
import { ProjectService } from './../../../../services/project.service';
import { UserService } from './../../../../services/user.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public addProjectForm: FormGroup;
  public isAddingProject: Boolean = false;
  public userFilter: string;

  public administrators = [];
  public managers = [];
  public associates = [];
  public employees = [];

  public tagName: string = '';

  constructor(
    private fb: FormBuilder,
    private user: UserService,
    private projectService: ProjectService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    const featuresFormGroup = this.fb.group({
      tasks: [false],
      messaging: [false],
      files: [false],
      comments: [false],
      billing: [false]
    });

    this.addProjectForm = this.fb.group({
      title: [null, Validators.required],
      caption: [null, Validators.required],
      description: [null],
      people: [[]],
      tags: [[]],
      startDate: [null],
      endDate: [null]
    });

    this.user.list().subscribe(users => {
      this.administrators = [];
      this.employees = [];

      users.forEach(user => {
        switch (user.role) {
          case 'Administrator':
            this.administrators.push(user);
            break;

          default:
            this.employees.push(user);
            break;
        }
      });
    });
  }

  public async createProject(form: FormGroup) {
    try {
      this.isAddingProject = true;
      this.validateForm(form);
      const project = form.value;
      project.people = project.people.concat(
        this.administrators.map(administrator => {
          return administrator.uId;
        })
      );

      await this.projectService.add(project);
      this.isAddingProject = false;
      this.alertService.showSuccess('Added Project Successfully');
      this.router.navigateByUrl('/project');
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
      throw new Error('Complete the form before submitting');
    }
  }

  public addPerson(personId) {
    const existingPeoples = this.addProjectForm.get('people').value || [];
    const index = existingPeoples.findIndex(id => id === personId);
    if (index > -1) {
      existingPeoples.splice(index, 1);
    } else {
      existingPeoples.push(personId);
    }
    this.addProjectForm.get('people').setValue(existingPeoples);
  }

  public addTags() {
    if (this.tagName) {
      const existingTags = this.addProjectForm.get('tags').value || [];
      const index = existingTags.findIndex(id => id === this.tagName);
      if (index === -1) {
        existingTags.push(this.tagName);
      }
      this.tagName = '';
      this.addProjectForm.get('tags').setValue(existingTags);
    }
  }

  public removeTag(tagName) {
    const existingTags = this.addProjectForm.get('tags').value || [];
    const index = existingTags.findIndex(id => id === tagName);
    if (index > -1) {
      existingTags.splice(index, 1);
    }
    this.addProjectForm.get('tags').setValue(existingTags);
  }
}
