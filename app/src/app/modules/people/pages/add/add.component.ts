import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material';

// Components
import { AddCompanyComponent } from './../../../shared/components/add-company/add-company.component';

// Services
import { UserService } from './../../../../services/user.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  public companies;
  public addUserForm: FormGroup;
  public isAddingUser: Boolean = false;

  constructor(
    public dialog: MatDialog,
    private userService: UserService,
    private fb: FormBuilder,
    private alert: AlertService,
    private router: Router
  ) {}

  ngOnInit() {
    this.addUserForm = this.fb.group({
      firstName: [null, Validators.required],
      surName: [null, Validators.required],
      designation: [null],
      role: [null],
      companyId: [null],
      companyName: [null],
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
      phone: [null]
    });
    this.companies = this.userService.getCompanies();
  }

  public async createUser(form) {
    try {
      this.isAddingUser = true;

      if (form.invalid) {
        this.isAddingUser = false;
        return false;
      }
      const user = form.value;
      if (user.role == true) {
        user.role = 'Administrator';
      } else {
        user.role = 'Employee';
      }
      await this.userService.add(form.value);
      this.alert.showSuccess('Created User Succcessfully');
      this.isAddingUser = false;
      this.router.navigateByUrl('/dashboard');
    } catch (error) {
      this.isAddingUser = false;
      this.alert.showError(error.message);
    }
  }

  /**
   * Validate the form
   * @param form FormGroup
   */
  private validateForm(form) {
    if (form.invalid) {
      throw new Error('Please fill all the fields');
    }
  }

  public addCompany() {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      height: '420px',
      width: '700px'
      // data: { projectId: this.projectId, taskId: this.taskId }
    });
  }
}
