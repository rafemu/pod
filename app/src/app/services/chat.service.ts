import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebaseApp from 'firebase/app';
import {
  map,
  mergeAll,
  skipUntil,
  switchMap,
  concat,
  filter,
  withLatestFrom
} from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';
// import { Observable } from 'rxjs';

interface Chat {
  user1?: string;
  user2?: string;
  lastMessage?: string;
  lastUpdated: any;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(
    private auth: AuthenticationService,
    private afs: AngularFirestore
  ) {}

  public insertChat(chatId, message, newChat) {
    const chatRoomRef = this.afs.collection('Chats').doc(chatId);

    let updateData: Chat = {
      lastUpdated: firebaseApp.firestore.FieldValue.serverTimestamp(),
      lastMessage: message
    };

    if (newChat === true) {
      const { user1, user2 } = this.getChatUserIDs(chatId);
      updateData[user1] = 'user';
      updateData[user2] = 'user';
    }

    chatRoomRef.set(updateData, {
      merge: true
    });

    return chatRoomRef.collection('messages').add({
      message: message,
      userId: this.auth.user.uid,
      createdAt: firebaseApp.firestore.FieldValue.serverTimestamp()
    });
  }

  public getMessages(chatId) {
    return this.afs
      .collection('Chats')
      .doc(chatId)
      .collection('messages', ref => ref.orderBy('createdAt', 'asc'))
      .valueChanges();
  }

  /**
   * Return the personal Chats of the Logged
   * in user
   */
  public getMyChats() {
    const userId = this.auth.user.uid;
    return this.afs
      .collection('Chats', ref => ref.where(userId, '==', 'user'))
      .valueChanges();
  }

  /**
   * Return the user Id's
   * Expects a lexicographically sorted string
   * @param chatId string | Combination of userId;s
   */
  private getChatUserIDs(chatId) {
    const [user1, user2] = chatId.split('_');
    return { user1, user2 };
  }

  // return this.collection.doc(userId).collection('Projects').doc(projectId).set({
  //   projectId: projectId,
  //   createdAt: firebaseApp.firestore.FieldValue.serverTimestamp()
}
