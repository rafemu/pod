import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-prompt',
  templateUrl: './prompt.component.html',
  styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {
  constructor(
    public dialogRef: MatDialogRef<PromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
}
