import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from './../services/user.service';

@Directive({
  selector: '[appUserAvatar]'
})
export class UserAvatarDirective implements OnInit {
  @Input('appUserAvatar')
  userId: string;
  constructor(private el: ElementRef, private user: UserService) {
    el.nativeElement.src = '/assets/spinner.gif';
  }

  ngOnInit() {
    if (!this.userId) {
      this.el.nativeElement.src = `/assets/user.png`;
      return false;
    }
    this.user.get(this.userId).subscribe(user => {
      if (!user) {
        this.el.nativeElement.src = `/assets/user.png`;
      } else if (user['avatar']) {
        this.el.nativeElement.src = user['avatar'];
        this.el.nativeElement.title = user['role'];
      } else {
        this.el.nativeElement.title = user['role'];
        this.el.nativeElement.src = `/assets/user.png`;
      }
    });
  }
}
