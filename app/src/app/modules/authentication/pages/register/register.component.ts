import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { AuthService } from './../../services/auth.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public isRegisterProgress: Boolean = false;

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {
    this.registerForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      fullName: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  ngOnInit() {}

  /**
   * Handles the Register submission
   * @param form FormGroup
   */
  public async submitRegister(form: FormGroup) {
    try {
      this.isRegisterProgress = true;
      this.validateForm(form);
      
      await this.auth.signUp(
        form.value.email,
        form.value.password,
        form.value.fullName
      );
      this.alert.showSuccess('Registered Successfully');
      this.isRegisterProgress = false;
    } catch (error) {
      this.isRegisterProgress = false;
      this.alert.showError(error.message);
    }
  }

  /**
   * Validate the form
   * @param form FormGroup
   */
  private validateForm(form) {
    if (form.invalid) {
      throw new Error('Please Enter valid input');
    }

    if (form.value.password !== form.value.confirmPassword) {
      throw new Error('Password do not match');
    }
  }
}
