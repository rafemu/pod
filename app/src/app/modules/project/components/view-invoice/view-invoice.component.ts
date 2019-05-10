import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

//Services
import { BillingService } from './../../../../services/billing.service';
import { AlertService } from './../../../../services/alert.service';
import { ProjectService } from './../../../../services/project.service';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrls: ['./view-invoice.component.scss']
})
export class ViewInvoiceComponent implements OnInit {
  public logs = [];
  public subTotal;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private billing: BillingService,
    private alertService: AlertService,
    private project: ProjectService) { }

  ngOnInit() {
    console.log(this.data);
    this.InvoiceDetail();
  }

  public InvoiceDetail() {
    this.billing.getInvoiceDetail(this.data.projectId, this.data.invoiceId).subscribe(
      logs => {
        this.logs = logs;
        this.getTotalTime(this.logs);

      },
      error => {
        this.alertService.showError(error.message);
      }

    );
  }

  getTotalTime(logs) {
    this.subTotal = this.project.calculateTimelogs(logs);
  }

}
