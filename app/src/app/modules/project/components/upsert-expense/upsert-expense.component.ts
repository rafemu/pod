import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Services
import { AlertService } from './../../../../services/alert.service';
import { BillingService } from './../../../../services/billing.service';
@Component({
  selector: 'app-upsert-expense',
  templateUrl: './upsert-expense.component.html',
  styleUrls: ['./upsert-expense.component.scss']
})
export class UpsertExpenseComponent implements OnInit {
  public expenseForm: FormGroup;

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private billing: BillingService,
    public dialogRef: MatDialogRef<UpsertExpenseComponent>,
    @Inject(MAT_DIALOG_DATA) public data,

  ) { }

  ngOnInit() {
    this.expenseForm = this.fb.group({
      expense: [null, Validators.required],
      cost: [null, Validators.required],
      date: [null, Validators.required],
      description: [null]
    });

  }

  public create(form: FormGroup) {
    try {
      if (form.invalid) {
        return false;
        // throw new Error(`You shouldn't leave the comment field like that`);
      }
      const expenseData = form.value;
      expenseData.projectId = this.data.projectId;

      this.billing.upsertExpense(expenseData);
      this.alertService.showSuccess('Created Invoice');
      this.dialogRef.close();

    } catch (error) {
      this.alertService.showError(error.message);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }



}
