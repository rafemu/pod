import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from './../../../../app.model';

// Services
import { ProjectService } from './../../../../services/project.service';
import { UserService } from './../../../../services/user.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  public projectId: string;
  public userRole: string;
  public project: Project;
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getUser();
    this.route.params.subscribe(
      params => {
        this.projectId = params.projectId;
        this.getProject(this.projectId);
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public getProject(projectId) {
    this.projectService.get(projectId).subscribe(
      project => {
        this.project = project;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  private getUser() {
    this.userService.getCurrentUser().subscribe(user => {
      if (user) {
        this.userRole = user['role'];
      }
    });
  }

  onActivate(event) {
    const scrollToTop = window.setInterval(() => {
      const pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 16);
  }
}
