import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-badge',
  templateUrl: './profile-badge.component.html',
  styleUrls: ['./profile-badge.component.scss']
})
export class ProfileBadgeComponent implements OnInit {

  @Input() public masrkAsSelected: Boolean = false;
  @Input() public userKey: String = null;  
  
  constructor() { }

  ngOnInit() {
  }

}
