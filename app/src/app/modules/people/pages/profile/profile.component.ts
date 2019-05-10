import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from './../../../../services/user.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public person;
  private userId;
  constructor(private route: ActivatedRoute, private userService: UserService, private alertService: AlertService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId= params.uId;
      this.getuserDetails();
    });
  }

  private getuserDetails(){
    this.userService.get(this.userId).subscribe(person => {
      this.person = person;
    }, error => {
        this.alertService.showError(error.message);
    })
  }

}
