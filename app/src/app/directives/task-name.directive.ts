import { Directive, Input, ElementRef } from '@angular/core';
import { TaskService } from './../services/task.service';

@Directive({
  selector: '[appTaskName]'
})
export class TaskNameDirective {
  @Input()
  projectId: string;
  @Input()
  taskId: string;

  constructor(private el: ElementRef, private task: TaskService) {}

  ngOnInit() {
    this.task.getTaskDetail(this.projectId, this.taskId).subscribe(task => {
      if (!task) {
        this.el.nativeElement.innerHTML = `Expired Task`;
      } else if (task) {
        this.el.nativeElement.innerHTML = `${task['title']}`;
      } else {
        this.el.nativeElement.innerHTML = `Expired Task`;
      }
    });
  }
}
