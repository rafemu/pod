import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-project-grid-item',
  templateUrl: './project-grid-item.component.html',
  styleUrls: ['./project-grid-item.component.scss']
})
export class ProjectGridItemComponent implements OnInit {
  @Input()
  public project;

  constructor() {}

  ngOnInit() {}
}
