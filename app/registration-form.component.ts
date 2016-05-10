import {Component} from 'angular2/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NgForm} from 'angular2/common';
import {User} from './user';

@Component({
  selector: 'soe-registration-form',
  templateUrl: 'app/registration-form.component.html',
  pipes: [TranslatePipe]
})
export class RegistrationFormComponent {
  model = new User(1, '', '');
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }
}