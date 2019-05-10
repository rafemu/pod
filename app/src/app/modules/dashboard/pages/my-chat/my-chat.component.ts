import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthenticationService } from './../../../../services/authentication.service';
import { UserService } from './../../../../services/user.service';
import { ChatService } from './../../../../services/chat.service';

@Component({
  selector: 'app-my-chat',
  templateUrl: './my-chat.component.html',
  styleUrls: ['./my-chat.component.scss']
})
export class MyChatComponent implements OnInit {
  public myId: string;
  // public userId: string;
  public users: Array<any> = [];
  public chats: Array<any> = [];
  public chatId: string;
  public activeView = 'chats';

  constructor(
    private auth: AuthenticationService,
    // private afAuth: AngularFireAuth,
    private userService: UserService,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.myId = this.auth.user.uid;

    this.chatService.getMyChats().subscribe(chats => {
      this.chats = chats;
      this.chats = chats.map(chat => {
        for (let key in chat) {
          if (chat[key] == 'user') {
            if (key != this.myId) {
              chat['userId'] = key;
            }
            delete chat[key];
          }
        }
        return chat;
      });
    });
    this.userService.list().subscribe(users => {
      this.users = users.filter(user => user['uId'] != this.myId);
    });
  }

  public getChat(userId) {
    let user1 = this.myId;
    let user2 = userId;
    this.chatId = user1 < user2 ? user1 + '_' + user2 : user2 + '_' + user1;
    // this.chatId = roomName;
  }

  public checkFriend() {}
}
