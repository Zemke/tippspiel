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
  user = new User(1, '', '', '', '');
  private users:User[];
  private errorMessage:string;
  private success:boolean;
  private response:any;

  constructor(private userService:UserService) {
  }

  onSubmit() {
    this.userService.addUser(this.user.first_name, this.user.last_name, this.user.email, this.user.password)
        .subscribe(
            response => this.response = response,
            error => {this.errorMessage = <any>error; this.success = false});
  }
}