import {Component, Input} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {Fixture} from './fixture';

@Component({
  selector: 'soe-fixture',
  templateUrl: 'app/fixture.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class FixtureComponent {
  @Input()
  fixture:Fixture;

  get debugFixture() {
    return JSON.stringify(this.fixture, null, 2);
  }
}
