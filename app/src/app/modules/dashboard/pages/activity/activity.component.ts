import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../../services/user.service';
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';
import { SlideInOutAnimation } from './../../../../app.animations';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss'],
  animations: [SlideInOutAnimation]
})
export class ActivityComponent implements OnInit {
  public projects = [];
  constructor(
    private user: UserService,
    private project: ProjectService,
    private alert: AlertService
  ) {}

  ngOnInit() {
    this.user.getMyProjects().subscribe(
      projects => {
        this.projects = projects;
        this.getProjectActivities();
      },
      error => {
        this.alert.showError(error.message);
      }
    );
  }

  /**
   * Get the Project Activities
   * @param projects Array<projectId>
   */
  getProjectActivities() {
    for (let project of this.projects) {
      this.project.getActivites(project.projectId).subscribe(
        activities => {
          project.activities = activities;
          project.lastActivityAt = Math.max.apply(
            Math,
            activities.map(function(o) {
              return o.createdAt.seconds;
            })
          );
          this.projects = this.projects.sort((a: any, b: any) => {
            return b.lastActivityAt - a.lastActivityAt;
          });
          if (this.projects.length > 0) {
            this.projects[0].expanded = true;
            for (let i = 1; i < this.projects.length; i++) {
              this.projects[i].expanded = false;
            }
          }
        },
        error => {
          this.alert.showError(error.message);
        }
      );
    }
  }
}
