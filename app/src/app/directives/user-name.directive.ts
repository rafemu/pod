import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { UserService } from './../services/user.service';

@Directive({
  selector: '[appUserName]'
})
export class UserNameDirective implements OnChanges {
  @Input('appUserName')
  userId: string;
  constructor(private el: ElementRef, private user: UserService) {
    el.nativeElement.innerHTML = 'fetching...';
  }

  // ngOnInit() {
    // if (!this.userId) {
    //   this.el.nativeElement.innerHTML = `User retired`;
    //   return false;
    // }

    // this.user.get(this.userId).subscribe(user => {
    //   if (!user) {
    //     this.el.nativeElement.innerHTML = `User retired`;
    //   } else {
    //     this.el.nativeElement.innerHTML = `${user['firstName']}`;
    //   }
    // });
  // }

  ngOnChanges(){
    if (!this.userId) {
      this.el.nativeElement.innerHTML = `User retired`;
      return false;
    }

    this.user.get(this.userId).subscribe(user => {
      if (!user) {
        this.el.nativeElement.innerHTML = `User retired`;
      } else {
        this.el.nativeElement.innerHTML = `${user['firstName']}`;
      }
    });
  }
}
