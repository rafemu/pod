import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProjectService } from './../../../../services/project.service';
import { AddFileComponent } from './../../components/add-file/add-file.component';

@Component({
  selector: 'app-project-files',
  templateUrl: './project-files.component.html',
  styleUrls: ['./project-files.component.scss']
})
export class ProjectFilesComponent implements OnInit {
  public isAddFile: Boolean = false;
  private projectId: string;
  // public files = [];
  public projectFiles = [];
  constructor(
    private project: ProjectService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.parent.params.subscribe(params => {
      this.projectId = params.projectId;
      this.getFiles();
    });
  }

  getFiles() {
    this.project.getFiles(this.projectId).subscribe(files => {
      this.projectFiles = files;
    });
  }

  addFile(){
    const dialogRef = this.dialog.open(AddFileComponent, {
      height: '420px',
      width: '700px',
      data: { projectId: this.projectId, taskId: null }
    });
  }

  // selectFiles(event) {
  //   this.files = Array.from(event.target.files);
  // }

  // /**
  //  * @description Upload Files
  //  */
  // uploadFiles() {
  //   this.files.forEach((file, index) => {
  //     const task = this.project.addFile(this.projectId, file);
  //     task.subscribe(progress => {
  //       file.percent = this.getPercentage(
  //         progress.bytesTransferred,
  //         progress.totalBytes
  //       );
  //       if (file.percent == 100) {
  //         this.files.splice(index, 1);
  //       }
  //     });
  //   });
  // }

  // /**
  //  * Returns the Percentage
  //  * @param transferred Number
  //  * @param total Number
  //  */
  // getPercentage(transferred, total) {
  //   if (transferred > 0) {
  //     return ((transferred / total) * 100).toFixed(2);
  //   } else {
  //     return 0;
  //   }
  // }

  // download(file) {
  //   return this.storage.ref(file.ref).getDownloadURL();
  // }
}
