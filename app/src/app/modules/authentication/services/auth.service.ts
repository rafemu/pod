import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthenticationModule } from './../authentication.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {}

  /**
   * Function will authenticate user with email and password
   * @param {string} email
   * @param {string} password
   */
  public signIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  /**
   * Creates a new user email, full name and password
   * @param {string} email
   * @param {string} password
   * @param {string} fullName
   */
  public signUp(email: string, password: string, fullName: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  /**
   * Function sends an email to provided mailId with a link to reset password
   * @param {string} email
   */
  public resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
