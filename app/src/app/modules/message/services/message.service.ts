import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

// Models
import { Message } from './../message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messagesCollection: AngularFirestoreCollection<Message>;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.messagesCollection = afs.collection<Message>('Messages');
  }

  /**
   * Insert Messages send by currenlty logged in uder into firestore
   * @param message
   */
  public sendMessage(message: Message) {
    this.messagesCollection.add(message);
  }

  public getMessages() {
    return this.afs
      .collection<Message>('Messages', ref => ref.orderBy('createdAt', 'desc').limit(30))
      .valueChanges();
  }
}
