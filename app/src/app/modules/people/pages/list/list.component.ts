import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { UserService } from './../../../../services/user.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public sort: string = 'firstName';
  public people: Array<any> = [];
  public isLoading: Boolean = true;
  public orderDesc = true;
  public term: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.listPeople();
  }

  private listPeople() {
    this.userService.list().subscribe(
      users => {
        this.people = users;
        this.isLoading = false;
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }
}
