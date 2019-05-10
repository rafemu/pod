import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { AuthenticationService } from './../../../../services/authentication.service';
import { UserService } from './../../../../services/user.service';
import { MenuComponent } from './../menu/menu.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public userId;
  constructor(
    private auth: AuthenticationService,
    private bottomSheet: MatBottomSheet,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userId = this.auth.user.uid;
  }

  openBottomSheet(): void {
    this.bottomSheet.open(MenuComponent);
  }

  public signOut() {
    this.auth.signOut();
    window.location.href = '/auth/login';
  }
}
