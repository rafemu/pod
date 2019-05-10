import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.scss']
})
export class ActivityItemComponent implements OnInit {
  @Input() public activity;
  @Input() public projectId;

  constructor() {}

  ngOnInit() {}
}
