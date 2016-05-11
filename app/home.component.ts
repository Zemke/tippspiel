import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';

@Component({
  selector: 'soe-home',
  templateUrl: 'app/home.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class HomeComponent {
}
