import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';
import { Project } from './../../../../app.model';

@Component({
  selector: 'app-project-overview',
  templateUrl: './project-overview.component.html',
  styleUrls: ['./project-overview.component.scss']
})
export class ProjectOverviewComponent implements OnInit {
  public projectId: string;
  public project: Project;
  public activites = [];
  public people: Array<object>;

  constructor(
    private route: ActivatedRoute,
    private projectSer: ProjectService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(
      params => {
        this.projectId = params.projectId;
        this.getProject();
        this.getActivites();
        this.getProjectPeople();
      },
      error => {
        this.alert.showError(error.message);
      }
    );
  }

  public getProject() {
    this.projectSer.get(this.projectId).subscribe(
      project => {
        this.project = project;
      },
      error => {
        this.alert.showError(error.message);
      }
    );
  }

  public getActivites() {
    this.projectSer.getActivites(this.projectId).subscribe(
      activities => {
        this.activites = activities;
      },
      error => {
        this.alert.showError(error.message);
      }
    );
  }

  getProjectPeople() {
    this.projectSer.getPeople(this.projectId).subscribe(people => {
      this.people = people;
    });
  }
}
