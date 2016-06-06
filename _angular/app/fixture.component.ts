import {Component, Input, OnInit} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {NgForm} from '@angular/common';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {Fixture} from './fixture';
import {FixtureBetService} from './fixture-bet.service';
import {FixtureBet} from './fixture-bet';
import {BetResultComponent} from './bet-result.component';
import {FixtureService} from './fixture.service';

@Component({
  selector: 'soe-fixture',
  templateUrl: 'app/fixture.component.html',
  directives: [MDL, BetResultComponent],
  pipes: [TranslatePipe]
})
export class FixtureComponent implements OnInit {
  @Input()
  fixture:Fixture;
  fixtureBet:FixtureBet;
  errorMessage:string;
  inFuture:boolean;
  unsavedChanges:boolean;
  private copyHome;
  private copyAway;

  constructor(private fixtureBetService:FixtureBetService, private fixtureService:FixtureService) {
  }

  ngOnInit() {
    if (this.fixture._bet) {
      this.fixtureBet = new FixtureBet(this.fixture._bet.fixture_id, this.fixture._bet.home_goals, this.fixture._bet.away_goals, null, null, null, null)
      this.copyHome = this.fixture._bet.home_goals;
      this.copyAway = this.fixture._bet.away_goals;
    } else {
      this.fixtureBet = new FixtureBet(null, null, null, null, null, null, null)
    }

    this.inFuture = this.fixtureService.inFuture(this.fixture);
  }

  onSubmit() {
    this.fixtureBetService.addFixtureBet(this.fixtureBet.home_goals, this.fixtureBet.away_goals, this.fixture.id, null)
        .subscribe(
            (bet:FixtureBet) => {
              this.copyHome = bet.home_goals;
              this.copyAway = bet.away_goals;
              this.checkUnsavedChanges();
            },
            error => this.errorMessage = <any>error);
  }

  checkUnsavedChanges() {
    if (!this.fixtureBet.home_goals || !this.fixtureBet.away_goals) {
      this.unsavedChanges = false;
    } else {
      this.unsavedChanges = (Number(this.fixtureBet.home_goals) !== Number(this.copyHome)
          || Number(this.fixtureBet.away_goals) !== Number(this.copyAway));
    }
  }

  get debugFixture() {
    return JSON.stringify(this.fixture, null, 2);
  }
}
