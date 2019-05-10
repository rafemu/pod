import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-people-item',
  templateUrl: './people-item.component.html',
  styleUrls: ['./people-item.component.scss']
})
export class PeopleItemComponent implements OnInit {
  @Input() public person;
  constructor() { }

  ngOnInit() {
  }

}
