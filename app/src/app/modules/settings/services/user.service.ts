import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private storage: AngularFireStorage
  ) {}

  public getCurrentUserId() {
    const user = this.afAuth.auth.currentUser;
    return user.uid;
  }

  public getUser() {
    const user = this.afAuth.auth.currentUser;
    return this.afs
      .collection('Users')
      .doc(user.uid)
      .valueChanges();
  }
  /**
   * Update the Profile data of currently logged in user
   * @param data
   */
  public updateProfile(data) {
    const user = this.afAuth.auth.currentUser;
    return this.afs
      .collection('Users')
      .doc(user.uid)
      .set(data, { merge: true });
  }

  /**
   * Change password of currently logged in user
   * @param password
   */
  public updatePassword(password) {
    const user = this.afAuth.auth.currentUser;
    return user.updatePassword(password);
  }

  /**
   * Add a file to the Project
   * @param projectId string
   */
  public updateAvatar = file => {
    const user = this.afAuth.auth.currentUser;
    const filePath = `avatars/${user.uid}-${file.lastModified}-${file.name}`;
    const task = this.storage.upload(filePath, file);
    return task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await this.storage
          .ref(filePath)
          .getDownloadURL()
          .toPromise();
        return this.afs
          .collection('Users')
          .doc(user.uid)
          .set(
            {
              avatar: url,
              lastUpdatedAt: new Date()
            },
            { merge: true }
          );
      })
    );
  };
}
