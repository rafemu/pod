import {
  Component,
  OnInit,
  OnChanges,
  Input,
  ViewChild,
  ElementRef
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ChatService } from './../../../../services/chat.service';
import { AuthenticationService } from './../../../../services/authentication.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnChanges {
  @Input()
  public chatId: string;

  public myId: string;
  public otherUserId: string;

  public isLoading: Boolean = true;
  public showEmoji: Boolean = false;
  public newChat: Boolean;

  public sendMessageForm: FormGroup;
  public messages: Array<any> = [];

  @ViewChild('chatContainer')
  chatContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.sendMessageForm = this.fb.group({
      message: [null, Validators.minLength]
    });
    this.myId = this.auth.user.uid;
    this.otherUserId = this.getOtherUser();
  }

  ngOnChanges() {
    this.otherUserId = this.getOtherUser();
    this.getMessages();
  }

  getOtherUser() {
    const users = this.chatId.split('_');
    const us = users.filter(userId => userId != this.myId);
    return us[0];
  }

  getMessages() {
    this.isLoading = true;
    this.chatService.getMessages(this.chatId).subscribe(
      messages => {
        this.isLoading = false;
        if (messages.length == 0) {
          this.newChat = true;
        }
        this.messages = messages;

        setTimeout(() => {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        }, 50);
      },
      error => {}
    );
  }

  public sendMessage(form) {
    const { message } = form.value;
    this.chatService.insertChat(this.chatId, message, this.newChat);
    form.resetForm();
  }

  public emojiSelected(event) {
    const currentValue = this.sendMessageForm.controls['message'].value;
    const newValue = currentValue
      ? currentValue + event.emoji.native
      : event.emoji.native;
    this.sendMessageForm.controls['message'].setValue(newValue);
    this.showEmoji = false;
  }
}
