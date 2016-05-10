import {Component, OnInit} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NgForm} from 'angular2/common';
import {User} from './user';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {UserService} from './user.service';

@Component({
  selector: 'soe-registration-form',
  templateUrl: 'app/registration-form.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class RegistrationFormComponent implements OnInit {
  user = new User(1, '', '', '', '');
  submitted = false;
  private users;
  private errorMessage;

  constructor(private userService:UserService) {

  }

  ngOnInit() { this.getHeroes(); }

  getHeroes() {
    this.userService.getUsers()
        .subscribe(
            heroes => this.users = heroes,
            error =>  this.errorMessage = <any>error);
  }

  onSubmit() {
    this.submitted = true;
    this.user = new User(1, '', '', '', '');
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.user);
  }
}