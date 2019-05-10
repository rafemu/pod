import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-project-notebook-detail',
  templateUrl: './project-notebook-detail.component.html',
  styleUrls: ['./project-notebook-detail.component.scss']
})
export class ProjectNotebookDetailComponent implements OnInit {
  public notebook = {};
  private notebookId;
  public projectId;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.notebookId = params.notebookId;
      this.route.parent.params.subscribe(parentParams => {
        this.projectId = parentParams.projectId;
        this.getNotebook();
      });
    });
  }

  public getNotebook() {
    this.projectService.getNotebook(this.projectId, this.notebookId).subscribe(
      notebook => {
        this.notebook = notebook;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }
}
