import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { messaging } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public messaging;
  constructor(private snackBar: MatSnackBar) {
    try {
      this.messaging = messaging();
    } catch (error) {
      this.showError('Push notifications is not supported in this browser');
    }
  }

  showError(message) {
    this.snackBar.open(message, 'Close', {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: 3000
    });
  }

  showSuccess(message) {
    this.snackBar.open(message, 'Close', {
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: 5000
    });
  }

  /**
   * Get Permission for Push and store
   * the user
   */
  getPermission() {
    return this.messaging.requestPermission().then(() => {
      return this.messaging.getToken();
    });
  }

  getPushMessage() {
    this.messaging.onMessage(payload => {
      this.showSuccess(
        `${payload.notification.title} : ${payload.notification.body}`
      );
      // this.currentMessage.next(payload)
    });
  }
}
