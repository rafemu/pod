import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material';
import { AuthenticationService } from './../../../../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    // private router: Router,
    private bottomSheetRef: MatBottomSheetRef<MenuComponent>
  ) { }

  ngOnInit() {
  }

  openLink(link) {
    console.log(link);
    this.bottomSheetRef.dismiss();
    // this.router.navigateByUrl(link)
  }

  public signOut() {
    this.auth.signOut();
    window.location.href = '/auth/login';
  }

}
