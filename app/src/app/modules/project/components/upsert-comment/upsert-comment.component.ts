import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//Services
import { AlertService } from './../../../../services/alert.service';
import { ProjectService } from './../../../../services/project.service';
import { TaskService } from './../../../../services/task.service';

@Component({
  selector: 'app-upsert-comment',
  templateUrl: './upsert-comment.component.html',
  styleUrls: ['./upsert-comment.component.scss']
})
export class UpsertCommentComponent implements OnInit {
  public commentForm: FormGroup;
  public people = [];
  constructor(
    private alertService: AlertService,
    private taskService: TaskService,
    private fb: FormBuilder,
    private project: ProjectService,
    public dialogRef: MatDialogRef<UpsertCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      description: [null, Validators.required]
    });
    console.log(this.data);
    this.getProject();
  }

  /**
 * Posts the Comment
 * @param form FormDirective
 */
  public async postComment(form: FormGroup) {
    try {
      if (form.invalid) {
        return false;
        // throw new Error(`You shouldn't leave the comment field like that`);
      }
      const commentData = form.value;
      commentData.taskId = this.data.taskId;
      commentData.projectId = this.data.projectId;
      this.taskService.addComment(commentData);
      this.alertService.showSuccess('Comment added');
      this.dialogRef.close();
    } catch (error) {
      this.alertService.showError(error.message);
    }
  }

  public getProject() {
    this.project.getPeople(this.data.projectId).subscribe(people => {
      this.people = people;
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }


}
