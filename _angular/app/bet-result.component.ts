import {Component, Input} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';

@Component({
  selector: 'soe-bet-result',
  templateUrl: 'app/bet-result.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class BetResultComponent {
  @Input()
  valuation:number;
  @Input()
  id:number;
}
