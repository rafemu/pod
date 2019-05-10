import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';

// Services
import { MessageService } from './../../services/message.service';

// Models
import { Message } from '../../message.model';

interface ShoutBox {
  loading: boolean;
  empty: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public messages: Array<Message> = [];
  public userId: string;
  public sendMessageForm: FormGroup;
  public shoutBox: ShoutBox;

  @ViewChild('messageContainer')
  messageContainer: ElementRef;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private messageService: MessageService
  ) {
    this.sendMessageForm = this.fb.group({
      message: [null, Validators.minLength]
    });
  }

  ngOnInit() {
    this.shoutBox = {
      loading: true,
      empty: false
    };
    this.afAuth.user.subscribe(user => {
      this.userId = user.uid;
    });
    this.messageService.getMessages().subscribe(messages => {
      this.messages = messages.reverse();
      this.shoutBox.loading = false;
      this.shoutBox.empty = this.messages.length === 0;
      // Scroll the container to bottom
      setTimeout(() => {
        this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
      }, 100);
    });
  }

  public async insertIntoMessage() {
    try {
      this.validateMessage(this.sendMessageForm);
      const message: Message = {
        text: this.sendMessageForm.controls.message.value,
        creatorUID: this.userId,
        createdAt: Date.now()
      };
      await this.messageService.sendMessage(message);
      this.sendMessageForm.reset();
    } catch (error) {}
  }

  private validateMessage(form) {
    if (form.invalid) {
      throw new Error('Oh!Oh! Please fill the Field');
    }
  }
}
