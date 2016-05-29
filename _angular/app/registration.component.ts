import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {User} from './user';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {UserService} from './user.service';

@Component({
  selector: 'soe-registration',
  templateUrl: 'app/registration.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class RegistrationComponent {
  user = new User(1, '', '', '', '', '', '');
  errMsg:string;
  email:string;
  password:string;
  emailUnmatch:boolean;
  passwordUnmatch:boolean;

  constructor(private userService:UserService) {
  }

  onSubmit() {
    this.emailUnmatch = this.user.email !== this.email;
    this.passwordUnmatch = this.user.password !== this.password;

    if (!this.emailUnmatch || !this.passwordUnmatch) {
      return;
    }

    this.userService.addUser(this.user.first_name, this.user.last_name, this.user.email, this.user.password)
        .subscribe(
            (response:any) => {localStorage.setItem('user_token', response.token); location.reload()},
            error => this.errMsg = <any>error);
  }
}