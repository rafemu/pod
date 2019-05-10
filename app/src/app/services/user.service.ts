import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Environment
import { environment } from '../../environments/environment';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebaseApp from 'firebase/app';

import { User } from './../app.model';

import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collection: AngularFirestoreCollection<User>;
  private _user;

  constructor(
    private auth: AuthenticationService,
    private afs: AngularFirestore,
    private http: HttpClient
  ) {
    this.collection = this.afs.collection<User>('Users');
    this.getCurrentUser().subscribe(user => {
      this.user = user;
    });
  }

  public set user(user) {
    this._user = user;
  }

  public get user() {
    return this._user;
  }

  public getCurrentUser() {
    const user = this.auth.user;
    return this.collection.doc(user.uid).valueChanges();
  }

  /**
   * Adds a User
   * @param user User
   * TODO : Check whether current user is admin
   */
  public async add(user: User) {
    const token = await this.auth.getCurrentUserToken();
    return this.http
      .post(environment.cloud.apiUrl + '/addUser', user, {
        headers: { Authorization: token }
      })
      .toPromise();
  }

  /**
   * List the Collections
   */
  public list() {
    return this.collection.valueChanges();
  }

  /**
   * Get the User
   * @param userId string
   */
  public get(userId: string) {
    return this.collection.doc(userId).valueChanges();
  }

  public addProject(projectId, userId) {
    const user = this.auth.user;
    return this.collection
      .doc(userId)
      .collection('Projects')
      .doc(projectId)
      .set(
        {
          projectId: projectId,
          createdAt: firebaseApp.firestore.FieldValue.serverTimestamp()
        },
        { merge: true }
      );
  }

  /**
   * Returns the array of projectId's for a user
   * @param userId string
   */
  public getMyProjects() {
    const userId = this.auth.user.uid;
    return this.collection
      .doc(userId)
      .collection('Projects')
      .valueChanges()
      .pipe(
        map(projects => {
          // const projects = [];
          // if (user['projects']) {
          projects.forEach(project => {
            project.activities = [];
            // projects.push({
            //   id: project,
            //   activities: []
            // });
          });
          // }
          return projects;
        })
      );
  }

  /**
   * Add a company
   * @param company object
   */
  public async addCompany(company) {
    const companyId = this.afs.createId();
    company.id = companyId;
    company.createdAt = new Date();
    company.lastUpdatedAt = new Date();
    await this.afs.doc(`Companies/${companyId}`).set(company);
    return companyId;
  }

  public getCompanies() {
    return this.afs.collection('Companies').valueChanges();
  }
}
