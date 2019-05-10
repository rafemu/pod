import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

//Services
import { AlertService } from './../../../../services/alert.service';
import { BillingService } from './../../../../services/billing.service';

@Component({
  selector: 'app-upsert-invoice',
  templateUrl: './upsert-invoice.component.html',
  styleUrls: ['./upsert-invoice.component.scss']
})
export class UpsertInvoiceComponent implements OnInit {
  myControl = new FormControl();
  currency: string[] = ['USD- US dollar', 'EUR- Euro', 'CAD- Canadian dollar'];
  // pricing: string[] = ['Invoice has a fixed price']
  filteredOptions: Observable<string[]>;

  public invoiceForm: FormGroup;
  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private invoice: BillingService,
    public dialogRef: MatDialogRef<UpsertInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.invoiceForm = this.fb.group({
      invoiceId: [null, Validators.required],
      issueDate: [null, Validators.required],
      currency: [null, Validators.required],
      pricing: [null, Validators.required],
      finalPrice: [null]
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.currency.filter(option => option.toLowerCase().includes(filterValue));
  }

  public create(form: FormGroup) {
    try {
      if (form.invalid) {
        return false;
        // throw new Error(`You shouldn't leave the comment field like that`);
      }
      const invoiceData = form.value;
      invoiceData.projectId = this.data.projectId;

      this.invoice.upsertInvoice(invoiceData);
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
