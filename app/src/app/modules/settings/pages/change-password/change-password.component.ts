import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

// Services
import { UserService } from './../../services/user.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public isPasswordChangeProgress: Boolean = false;

  constructor(
    private auth: UserService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {
    this.changePasswordForm = this.fb.group({
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  ngOnInit() {}

  /**
   * Handles the form to change password
   * @param form FormGroup
   */
  public async CreateNewPassword(form: FormGroup) {
    try {
      this.isPasswordChangeProgress = true;
      this.validateForm(form);
      await this.auth.updatePassword(
        this.changePasswordForm.controls.newPassword.value
      );
      this.alert.showSuccess('Changed Password Successfully');
      this.isPasswordChangeProgress = false;
      form.reset();
    } catch (error) {
      this.isPasswordChangeProgress = false;
      this.alert.showError(error.message);
    }
  }

  /**
   * Validate the form
   * @param form FormGroup
   */
  private validateForm(form) {
    if (form.invalid) {
      throw new Error(`Ah ah! That's not a valid input`);
    }

    if (form.value.newPassword !== form.value.confirmPassword) {
      throw new Error('Password do not match');
    }
  }
}
