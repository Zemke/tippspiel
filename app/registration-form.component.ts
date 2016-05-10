import {Component} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NgForm} from 'angular2/common';
import {User} from './user';
import {MDL} from './material-design-lite-upgrade-element.directive';

@Component({
  selector: 'soe-registration-form',
  templateUrl: 'app/registration-form.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class RegistrationFormComponent {
  user = new User(1, '', '', '', '');
  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.user = new User(1, '', '', '', '');
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.user);
  }
}