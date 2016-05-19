import {Component, Input} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NgForm} from '@angular/common';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {Fixture} from './fixture';
import {FixtureBetService} from './fixture-bet.service';
import {FixtureBet} from './fixture-bet';
import fbind = Q.fbind;

@Component({
  selector: 'soe-fixture',
  templateUrl: 'app/fixture.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class FixtureComponent {
  @Input()
  fixture:Fixture;
  fixtureBet:FixtureBet = new FixtureBet(null, null, null, null, null, null, null, null);
  errorMessage;

  constructor(private fixtureBetService:FixtureBetService) {

  }

  onSubmit() {
    this.fixtureBetService.addFixtureBet(this.fixtureBet.home_goals, this.fixtureBet.away_goals, this.fixture.id, null)
        .subscribe(
            error =>  this.errorMessage = <any>error);;
  }

  get debugFixture() {
    return JSON.stringify(this.fixture, null, 2);
  }
}
