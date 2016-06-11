import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {FixturesListComponent} from './fixtures-list.component';

@Component({
  selector: 'soe-home',
  template: require('app/home.component.html!text'),
  directives: [MDL, FixturesListComponent],
  pipes: [TranslatePipe]
})
export class HomeComponent {
}
