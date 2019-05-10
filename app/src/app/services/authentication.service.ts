import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _user;
  constructor(
    private afAuth: AngularFireAuth,
    private alert: AlertService,
    private afs: AngularFirestore
  ) {

    const user = this.afAuth.auth.currentUser;
    this.user = user;

    this.afAuth.user.subscribe(async user => {
      // this.user = user;
      try {
        const token = await this.alert.getPermission();
        this.alert.getPushMessage();
        this.updatePushToken(token);
      } catch (error) {
      }

    });
  }

  public set user(user) {
    this._user = user;
  }

  public get user() {
    return this._user;
  }

  public signOut() {
    this.afAuth.auth.signOut();
  }

  /**
   * Funtion will return current user token
   */
  public getCurrentUserToken() {
    return this.afAuth.auth.currentUser.getIdToken();
  }

  /**
   * Update the User's push token
   * @param token string
   */
  public updatePushToken(token) {
    const user = this.afs.doc(`Users/${this.user.uid}`);
    user.set(
      {
        pushToken: token
      },
      {
        merge: true
      }
    );
  }
}
