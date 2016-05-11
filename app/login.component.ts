import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {User} from './user';
import {MDL} from './material-design-lite-upgrade-element.directive';

@Component({
  selector: '<soe-login></soe-login>',
  templateUrl: 'app/login.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class LoginComponent {
  user:User = new User(1, '', '', '', '');
}
