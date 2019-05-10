import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { UserService } from './../../services/user.service';
import { AlertService } from './../../../../services/alert.service';

interface User {
  fullName: string;
  salutation: string;
  gender: 'm' | 'f';
  mobile: string;
}

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {
  public userId: string;
  public profileUpdateForm: FormGroup;
  public isProfileUpdating: Boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private alert: AlertService
  ) {
    this.profileUpdateForm = this.fb.group({
      firstName: [null],
      lastName: [null],
      salutation: [null],
      gender: [null],
      mobile: [null],
      designation: [null]
    });
  }

  ngOnInit() {
    this.userId = this.userService.getCurrentUserId();
    this.userService.getUser().subscribe(user => {
      Object.keys(user).forEach(key => {
        if (this.profileUpdateForm.controls[key]) {
          this.profileUpdateForm.controls[key].setValue(user[key]);
        }
      });
    });
  }

  /**
   * Function Handles Profile Update Form
   * @param form
   */
  public async submitProfileForm(form: FormGroup) {
    try {
      this.isProfileUpdating = true;
      this.validateForm(form);
      await this.userService.updateProfile(form.value);
      this.alert.showSuccess('Profile Updated Successfully');
      this.isProfileUpdating = false;
    } catch (error) {
      this.isProfileUpdating = false;
      this.alert.showError(error.message);
    }
  }

  public selectAvatar() {
    document.getElementById('fileInput').click();
  }

  public uploadAvatar(files) {
    const file = files[0];
    this.alert.showSuccess('Updating Avatar...');
    this.userService.updateAvatar(file).subscribe(
      res => {
      },
      error => {
        this.alert.showError(error.message);
      }
    );
  }

  /**
   * Validate the form
   * @param form FormGroup
   */
  private validateForm(form) {
    if (form.invalid) {
      throw new Error('Oh! Oh! Please fill all the fields');
    }
  }
}
