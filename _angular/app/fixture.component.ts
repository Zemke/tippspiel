import {Component, Input, OnInit} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NgForm} from '@angular/common';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {Fixture} from './fixture';
import {FixtureBetService} from './fixture-bet.service';
import {FixtureBet} from './fixture-bet';

@Component({
  selector: 'soe-fixture',
  templateUrl: 'app/fixture.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class FixtureComponent implements OnInit {
  @Input()
  fixture:Fixture;
  fixtureBet:FixtureBet;
  errorMessage;

  constructor(private fixtureBetService:FixtureBetService) {

  }

  ngOnInit () {
    if (this.fixture._bet) {
      this.fixtureBet = new FixtureBet(this.fixture._bet.fixture_id, this.fixture._bet.home_goals, this.fixture._bet.away_goals, null, null, null, null)
    } else {
      this.fixtureBet = new FixtureBet(null, null, null, null, null, null, null)
    }
  }

  onSubmit() {
    this.fixtureBetService.addFixtureBet(this.fixtureBet.home_goals, this.fixtureBet.away_goals, this.fixture.id, null)
        .subscribe(
            error =>  this.errorMessage = <any>error);
  }

  get debugFixture() {
    return JSON.stringify(this.fixture, null, 2);
  }
}
