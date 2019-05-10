import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ProjectService } from './../services/project.service';

@Directive({
  selector: '[appProjectName]'
})
export class ProjectNameDirective implements OnInit {
  @Input('appProjectName')
  projectId: string;
  constructor(private el: ElementRef, private project: ProjectService) {
    el.nativeElement.innerHTML = 'fetching...';
  }

  ngOnInit() {
    this.project.get(this.projectId).subscribe(project => {
      if (!project) {
        this.el.nativeElement.innerHTML = `Unknown Project`;
      } else {
        this.el.nativeElement.innerHTML = `${project['title']}`;
      }
    });
  }
}
