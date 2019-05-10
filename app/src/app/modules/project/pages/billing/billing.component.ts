import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from '@angular/material';

//Services
import { BillingService } from './../../../../services/billing.service';
import { ProjectService } from './../../../../services/project.service';
import { TaskService } from './../../../../services/task.service';

//Components
import { UpsertInvoiceComponent } from './../../components/upsert-invoice/upsert-invoice.component';
import { UpsertExpenseComponent } from './../../components/upsert-expense/upsert-expense.component';
import { ViewInvoiceComponent } from './../../components/view-invoice/view-invoice.component';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  @Input()
  projectId: string;
  public invoices = [];
  public expenses = [];
  public logs = [];
  public total;
  public activeView: 'time' | 'expense' = 'time';

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private billing: BillingService,
    private projectService: ProjectService,
    private taskService: TaskService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.projectId = params.projectId;
    });

    this.getInvoices();
    this.listExpenses();
    this.listTimelogs();
  }

  moveToInvoice(): void {
    // console.log(this.logs)

    const selectedLogs = this.logs.filter(log => log.selected == true);

    console.log(selectedLogs);

    const bottomSheetRef = this.bottomSheet.open(BottomSheetInvoice, {
      data: { projectId: this.projectId, logs: selectedLogs }
    });
  }

  public addInvoice() {
    const addDialog = this.dialog.open(UpsertInvoiceComponent, {
      width: '500px',
      // height: '800px',
      data: { projectId: this.projectId }
    });
  }

  public getInvoices() {
    this.billing.getInvoices(this.projectId).subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  public addExpense() {
    const addDialog = this.dialog.open(UpsertExpenseComponent, {
      width: '500px',
      // height: '800px',
      data: { projectId: this.projectId }
    });
  }

  public listExpenses() {
    this.billing.getexpenses(this.projectId).subscribe(expenses => {
      this.expenses = expenses;
    });
  }

  public listTimelogs() {
    this.billing.getUnbilledTimelogs(this.projectId).subscribe(logs => {
      this.logs = logs;
    });
  }

  public getTotalTime(from, to) {
    return this.projectService.calculateTimeDifference(from, to).toFixed(2);
  }
  
  public openInvoice(invoiceId){
    const addDialog = this.dialog.open(ViewInvoiceComponent, {
      width: '80%',
      height: '90%',
      data: { projectId: this.projectId, invoiceId: invoiceId }
    });
  }
}

/**
 * @title Bottom Sheet Overview
 */
@Component({
  selector: 'bottom-sheet-invoice',
  templateUrl: './bottom-sheet-invoice.html'
})
export class BottomSheetInvoice {
  public invoices = [];
  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetInvoice>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data,
    private billingService: BillingService,
    private taskService: TaskService
  ) {
    this.getInvoices(this.data.projectId);
  }

  public createInvoice(event: MouseEvent): void {
    console.log('harshga', this.data);
    // this.bottomSheetRef.dismiss();
    // event.preventDefault();
  }

  public getInvoices(projectId) {
    this.billingService.getInvoices(projectId).subscribe(invoices => {
      this.invoices = invoices;
    });
  }

  public moveToInvoice(invoice) {
    let selectedLogs = this.data.logs;
    for (let index = 0; index < selectedLogs.length; index++) {
      selectedLogs[index].invoiceId = invoice.invoiceId;
      this.updateTimeLog(selectedLogs[index]);
    }
    this.bottomSheetRef.dismiss();
  }

  async updateTimeLog(time) {
    await this.taskService.addTimeLog(time);
  }
}
