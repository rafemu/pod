import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from './../../services/auth.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  public resetPasswordForm: FormGroup;
  public isResetPasswordProgress: Boolean = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {
    this.resetPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    document.body.style.marginBottom = '0';
  }

  ngOnDestroy() {
    document.body.style.marginBottom = '60px';
  }

  /**
   * Handles the Reset Password Form
   * @param form FormGroup
   */
  public async changePassword(form: FormGroup) {
    try {
      if (form.invalid) {
        return false;
      }
      this.isResetPasswordProgress = true;
      this.validateForm(form);
      await this.auth.resetPassword(form.value.email);
      this.alert.showSuccess('An email has been sent to your address');
      this.isResetPasswordProgress = false;
    } catch (error) {
      this.isResetPasswordProgress = false;
      this.alert.showError(error.message);
    }
  }

  /**
   * Validate the form
   * @param form FormGroup
   */
  private validateForm(form) {
    if (form.value.password !== form.value.confirmPassword) {
      throw new Error('Password do not match');
    }
  }
}
