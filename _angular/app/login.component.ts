import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {User} from './user';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {UserService} from './user.service';

@Component({
  selector: '<soe-login></soe-login>',
  templateUrl: 'app/login.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class LoginComponent {
  user:User = new User(1, '', '', '', '', '', '');
  error:string;

  constructor(private userService:UserService) {
  }

  onSubmit() {
    this.userService.login(this.user.email, this.user.password)
        .subscribe(
            response => {localStorage.setItem('user_token', response.token); location.href = '/'},
            error => this.error = error);
  }
}
