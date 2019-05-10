import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { PromptComponent } from './../../../shared/components/prompt/prompt.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-project-add-notebook',
  templateUrl: './project-add-notebook.component.html',
  styleUrls: ['./project-add-notebook.component.scss']
})
export class ProjectAddNotebookComponent implements OnInit {
  public projectId;
  private notebookId;
  public notebook;
  public users: Array<any> = [];
  public projectPeople = [];
  public notebookForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.notebookForm = this.fb.group({
      id: [null],
      title: [null, Validators.required],
      description: [null, Validators.required],
      people: [null]
    });
    this.route.parent.params.subscribe(params => {
      this.projectId = params.projectId;
      this.route.params.subscribe(params => {
        this.notebookId = params.notebookId;
        if (this.notebookId) {
          this.editNotebook();
        }
      });
      this.getMembers();
    });
  }

  public async addnoteBook(form: FormGroup) {
    try {
      const data = form.value;
      if (form.invalid) {
        return false;
      }
      data.projectId = this.projectId;
      await this.projectService.saveNoteBook(data);
      this.alertService.showSuccess('Notebook saved');
      this.router.navigate(['project/manage/', this.projectId, 'diaries']);
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }

  public getProject() {
    this.projectService.get(this.projectId).subscribe(
      project => {
        this.users = project.people;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public getMembers() {
    this.projectService.getPeople(this.projectId).subscribe(
      people => {
        this.users = people;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  /**
   * Add or Remove a Person
   * @param personId string
   */
  public addOrRemovePerson(personId) {
    const projectPeople = this.notebookForm.controls['people'].value || [];

    const index = projectPeople.findIndex(id => id === personId);
    if (index > -1) {
      projectPeople.splice(index, 1);
    } else {
      projectPeople.push(personId);
    }

    this.notebookForm.controls['people'].setValue(projectPeople);
  }

  public navigateToNotebooks() {
    this.dialog
      .open(PromptComponent, {
        width: '250px'
      })
      .afterClosed()
      .subscribe(choice => {
        if (choice) {
          this.router.navigate(['project/manage', this.projectId, 'diaries']);
        } else {
        }
      });
  }

  public editNotebook() {
    this.projectService.getNotebook(this.projectId, this.notebookId).subscribe(
      notebook => {
        this.notebook = notebook;
        this.notebookForm.patchValue(notebook);
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }
}
