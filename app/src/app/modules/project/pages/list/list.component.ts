import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

// Services
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';
import { UserService } from './../../../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public projects: Array<any> = [];
  public view = window.localStorage.getItem('projectView') || 'list';
  public status: 'active' | 'archived';
  public loading: Boolean = true;
  public sort = 'lastUpdated';
  public orderDesc = true;
  public term: string;

  constructor(
    private projectService: ProjectService,
    private alertService: AlertService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.status = params.status;
        this.getProjects();
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public setView(view) {
    this.view = view;
    window.localStorage.setItem('projectView', this.view);
  }

  /**
   * Get the User's Project
   * Map and filter out any which doesn't
   * include him
   */
  public getProjects() {
    this.userService
      .getMyProjects()
      .pipe(
        map(projects => {
          let myProjects = [];
          projects.forEach(project => {
            myProjects.push(project.projectId);
          });
          return myProjects;
        })
      )
      .subscribe(
        myProjects => {
          this.projectService.list(this.status).subscribe(
            projects => {
              this.projects = projects.filter(project =>
                myProjects.includes(project.id)
              );
              this.loading = false;
            },
            error => {
              this.alertService.showError(error.message);
            }
          );
        },
        error => {
          this.alertService.showError(error.message);
        }
      );
  }
}
