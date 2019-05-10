import { Component, OnInit, Inject } from '@angular/core';
import { ProjectService } from './../../../../services/project.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.scss']
})
export class AddFileComponent implements OnInit {
  public files = [];

  constructor(
    private project: ProjectService,
    public dialogRef: MatDialogRef<AddFileComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
  }

  selectFiles(event) {
    this.files = this.files.concat(Array.from(event.target.files));
  }

  /**
   * @description Upload Files
   */
  uploadFiles() {
    this.files.forEach((file, index) => {
      const task = this.project.addFile(this.data.projectId, file, this.data.taskId);
      task.subscribe(progress => {
        file.percent = this.getPercentage(
          progress.bytesTransferred,
          progress.totalBytes
        );
        // if (file.percent == 100) {
          // this.files.splice(index, 1);
        // }
      });
    });
  }

  /**
   * Returns the Percentage
   * @param transferred Number
   * @param total Number
   */
  getPercentage(transferred, total) {
    if (transferred > 0) {
      return ((transferred / total) * 100).toFixed(2);
    } else {
      return 0;
    }
  }
}
