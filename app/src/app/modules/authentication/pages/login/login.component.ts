import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isLoginInProgress: Boolean = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private alert: AlertService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  ngOnInit() {
    document.body.style.marginBottom = '0';
  }

  ngOnDestroy() {
    document.body.style.marginBottom = '60px';
  }

  /**
   * Handles the Login submission
   * @param form FormGroup
   */
  public async submitLogin(form: FormGroup) {
    try {
      if (form.invalid) {
        return false;
      }
      this.isLoginInProgress = true;

      // Login with Email and Password
      await this.auth.signIn(form.value.email, form.value.password);
      this.alert.showSuccess('Welcome Back');
      this.router.navigateByUrl('/dashboard');
      this.isLoginInProgress = false;
    } catch (error) {
      this.isLoginInProgress = false;
      this.alert.showError(error.message);
    }
  }


}
