import { Directive, Input, ElementRef, OnInit } from '@angular/core';
import { ProjectService } from './../services/project.service';

@Directive({
  selector: '[appNotebookName]'
})
export class NotebookNameDirective {
  @Input()
  projectId: string;
  @Input()
  taskId: string;

  constructor(private el: ElementRef, private project: ProjectService) {}

  ngOnInit() {
    this.project.getNotebook(this.projectId, this.taskId).subscribe(notebook => {
      if (!notebook) {
        this.el.nativeElement.innerHTML = `Expired Notebook`;
      } else if (notebook) {
        this.el.nativeElement.innerHTML = `${notebook['title']}`;
      } else {
        this.el.nativeElement.innerHTML = `Expired Notebook`;
      }
    });
  }
}
