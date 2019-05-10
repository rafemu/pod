import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebaseApp from 'firebase/app';
import { AngularFireStorage } from 'angularfire2/storage';
import { Invoice, Expense, Time } from './../app.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private collection: AngularFirestoreCollection<Invoice>;
  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private auth: AuthenticationService
  ) {
    // this.collection = this.afs.collection<Invoice>('Invoices');
  }

  private getCollection(projectId) {
    return this.afs.collection('Projects').doc(projectId).collection<Invoice>('Invoices');
  }

  public upsertInvoice(invoice: Invoice) {
    const invoiceId = invoice.invoiceId;
    invoice.createdAt = new Date();
    invoice.lastUpdatedAt = new Date();
    return this.getCollection(invoice.projectId).doc(invoiceId).set(invoice);
  }

  /**
   * @uses Get all the invoices under a project
   * @param projectId 
   */
  public getInvoices(projectId) {
    return this.getCollection(projectId).valueChanges();
  }

  /**
   * @uses Get all the Expenses inside a project
   * @param expense 
   */
  public upsertExpense(expense: Expense) {
    const expenseId = this.afs.createId();
    expense.createdAt = new Date();
    expense.lastUpdatedAt = new Date();
    expense.userId = this.auth.user.uid;
    const expenseCollection = this.afs.collection<Expense>(
      `Projects/${expense.projectId}/Expenses`
    );
    return expenseCollection.doc(expenseId).set(expense);
  }

  /**
   * List all the expenses under a project
   * @param projectId 
   */
  public getexpenses(projectId) {
    const expenseCollection = this.afs.collection<Expense>(
      `Projects/${projectId}/Expenses`
    );
    return expenseCollection.valueChanges();
  }

  public getUnbilledTimelogs(projectId) {
    return this.afs
      .collection<Time>(`Projects/${projectId}/Time`, ref => ref.where('invoiceId', '==', null).where('isBillable', '==', 'true'))
      .valueChanges();
  }

  public getInvoiceDetail(projectId, invoiceId){
    return this.afs
    .collection<Invoice>(`Projects/${projectId}/Time/`, ref => ref.where('invoiceId', '==', invoiceId))
    .valueChanges();
  }
}


