import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// Services
import { ProjectService } from './../../../../services/project.service';
import { AlertService } from './../../../../services/alert.service';

@Component({
  selector: 'app-project-chat',
  templateUrl: './project-chat.component.html',
  styleUrls: ['./project-chat.component.scss']
})
export class ProjectChatComponent implements OnInit {
  public chatForm: FormGroup;
  private projectId: string;
  public showEmoji: Boolean = false;
  public messages: Array<any> = [];

  @ViewChild('chatContainer')
  chatContainer: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.chatForm = this.fb.group({
      message: [null, Validators.required]
    });
    this.route.parent.params.subscribe(params => {
      this.projectId = params.projectId;
      this.getChat(this.projectId);
    });
  }

  public sendMessage(form) {
    try {
      if (form.invalid) {
        throw new Error(`You shouldn't leave the comment field like that`);
      }
      const chat = form.value;
      chat.projectId = this.projectId;
      this.projectService.addChat(chat);
      form.resetForm();
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }

  public getChat(projectId) {
    this.projectService.getChat(projectId).subscribe(
      chat => {
        this.messages = chat;
        // Scroll the container to bottom
        setTimeout(() => {
          this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
        }, 50);
      },
      error => {
        this.alertService.showError(error.message);
      }
    );
  }

  public emojiSelected(event) {
    const currentValue = this.chatForm.controls['message'].value;
    const newValue = currentValue
      ? currentValue + event.emoji.native
      : event.emoji.native;
    this.chatForm.controls['message'].setValue(newValue);
    this.showEmoji = false;
  }
}
