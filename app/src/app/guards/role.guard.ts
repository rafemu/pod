import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserService } from './../services/user.service';
import { AlertService } from './../services/alert.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private user: UserService,
    private router: Router,
    private alert: AlertService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let roles = next.data["roles"] as Array<string>;
    let redirectPath = next.data['redirectPath'];

    return this.user.getCurrentUser().pipe(
      map((user: any) => {
        if (roles.includes(user.role)) {
          return true;
        } else {
          this.alert.showError('You are not authorized to access that resource');
          this.router.navigate([redirectPath]);
        }
      })
    );

  }
}
