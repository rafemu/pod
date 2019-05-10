import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { UserService } from './../../../../services/user.service';
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {
  public projectId: string;
  public existingProjectPeople: Array<object>;
  public projectPeople: Array<object>;

  public firstListen = true;
  public isSavingPeople = false;
  public existingPeople: Array<object> = [];
  public people: Array<object> = [];
  public showAddOrRemovePeopleDiv: Boolean = false;

  public project;
  public userRole: string;
  public projectStatus: string;
  public projectUpdateForm: FormGroup;
  public isProjectUpdating: Boolean = false;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.projectUpdateForm = this.fb.group({
      title: [null, Validators.required],
      caption: [null, Validators.required],
      description: [null]
    });
  }

  ngOnInit() {
    this.getUser();
    this.route.parent.params.subscribe(
      params => {
        this.projectId = params.projectId;
        this.getProject();
        // this.getProjectPeople();
        this.getUsers();
        this.projectService.get(this.projectId).subscribe(user => {
          Object.keys(user).forEach(key => {
            if (this.projectUpdateForm.controls[key]) {
              this.projectUpdateForm.controls[key].setValue(user[key]);
            }
          });
        });
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public async updateProjectDetail(form: FormGroup) {
    try {
      this.isProjectUpdating = true;
      this.validateForm(form);
      await this.projectService.updateProject(form.value, this.projectId);
      this.isProjectUpdating = false;
    } catch (error) {}
  }

  getUsers() {
    this.userService.list().subscribe(users => {
      // this.people = users.filter(user => user.role !== 'Administrator');
      this.firstListen = true;

      this.people = users;
      this.getProjectPeople();
    });
  }
  getProjectPeople() {
    this.projectService.getPeople(this.projectId).subscribe(projectPeople => {
      let allUsers = this.people;

      console.log('all', allUsers, projectPeople);

      if (this.firstListen === true) {
        this.firstListen = false;
        // Administrators
        // const administrators = allUsers.filter(
        //   (user: any) => user.role === 'Administrator'
        // );

        // Project people after filtering administrators
        this.projectPeople = projectPeople
        
        // .filter(
        //   (user: any) =>
        //     administrators.findIndex(
        //       (admin: any) => admin.uId === user.userId
        //     ) === -1
        // );

        // Filtering non administrator users
        allUsers = allUsers
          // .filter((user: any) => user.role !== 'Administrator')
          .map((user: any) => ({ userId: user.uId }));
      }

      // people = people.filter(user => user.userId !== 'Pch5ip6VisQDGXzEqg43btO2E3d2');
      this.people = allUsers.filter(
        (user: any) =>
          this.projectPeople.findIndex((p: any) => p.userId === user.userId) ===
          -1
      );

      this.existingPeople = [...this.people];
      this.existingProjectPeople = [...this.projectPeople];
    });
  }

  public hideAddOrRemoveSection() {
    this.projectPeople = [...this.existingProjectPeople];
    this.people = [...this.existingPeople];

    this.showAddOrRemovePeopleDiv = false;
  }

  public async savePeoples() {
    try {
      this.isSavingPeople = true;
      const existingPeople = [...this.people];
      await this.projectService.updateProjectPeople(
        this.projectPeople,
        existingPeople,
        this.projectId
      );
      this.showAddOrRemovePeopleDiv = false;
      this.isSavingPeople = false;
    } catch (error) {
      this.isSavingPeople = false;
      console.log(error.message);
    }
  }

  public addOrRemovePeople(userId) {
    if (this.showAddOrRemovePeopleDiv) {
      const allUsers = this.people;
      const existingPeoples = this.projectPeople || [];

      const indexAtUsers = allUsers.findIndex(
        (user: any) => user.userId === userId
      );
      const indexAtExistingPeople = existingPeoples.findIndex(
        (user: any) => user.userId === userId
      );

      if (indexAtExistingPeople > -1) {
        existingPeoples.splice(indexAtExistingPeople, 1);
        allUsers.push({ userId });
      } else {
        existingPeoples.push({ userId });
        allUsers.splice(indexAtUsers, 1);
      }

      this.projectPeople = existingPeoples;
      this.people = allUsers;
    }
  }

  private getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userRole = user['role'];
      }
    });
  }

  public getProject() {
    this.projectService.get(this.projectId).subscribe(project => {
      this.project = project;
      this.projectStatus = project.status;
    });
  }

  // public showAddOrRemovePeopleDiv() {

  // }
  public deleteProject() {
    this.projectService.deleteProject(this.projectId);
    this.alertService.showSuccess('Project queued for deletion');
    this.router.navigate(['dashboard']);
  }

  public archiveProject() {
    let newStatus;
    if (this.projectStatus == 'active') {
      newStatus = 'archived';
    } else {
      newStatus = 'active';
    }
    this.projectService.updateProjectStatus(this.projectId, newStatus);
  }

  public selectImage() {
    document.getElementById('fileInput').click();
  }

  public uploadProjectImage(files) {
    const file = files[0];
    this.alertService.showSuccess('Updating Avatar...');
    this.projectService.updateProjectImage(file, this.projectId).subscribe(
      res => {},
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  /**
   * Validate the form
   * @param form FormGroup
   */
  private validateForm(form) {
    if (form.invalid) {
      throw new Error('Oh! Oh! Please fill all the fields');
    }
  }
}
