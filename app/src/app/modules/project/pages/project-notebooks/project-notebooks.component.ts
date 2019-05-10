import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';
import { UserService } from './../../../../services/user.service';

@Component({
  selector: 'app-project-notebooks',
  templateUrl: './project-notebooks.component.html',
  styleUrls: ['./project-notebooks.component.scss']
})
export class ProjectNotebooksComponent implements OnInit {
  public projectId;
  public notebooks = [];
  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.projectId = params.projectId;
      this.getNotebooks();
    });
  }

  public getNotebooks() {
    this.projectService.getNotebooks(this.projectId).subscribe(
      notebooks => {
        const user = this.userService.user;
        if (user.role != 'administrator') {
          this.notebooks = notebooks.filter(notebook => {
            if (notebook.userId === user.uId) {
              return true;
            } else if (notebook.people) {
              return notebook.people.includes(user.uId);
            } else {
              return false;
            }
          });
        } else {
          this.notebooks = notebooks;
        }
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }
}
