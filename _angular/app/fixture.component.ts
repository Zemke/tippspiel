import {Component, Input, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {Fixture} from './fixture';
import {FixtureBetService} from './fixture-bet.service';
import {FixtureBet} from './fixture-bet';
import {BetResultComponent} from './bet-result.component';
import {FixtureService} from './fixture.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {ROUTER_DIRECTIVES} from '@angular/router';
import {User} from './user';

@Component({
  selector: 'soe-fixture',
  templateUrl: 'app/fixture.component.html',
  directives: [MDL, BetResultComponent, ROUTER_DIRECTIVES],
  pipes: [TranslatePipe]
})
export class FixtureComponent implements OnInit {
  @Input()
  fixture:Fixture;
  @Input()
  user:User;
  fixtureBet:FixtureBet;
  errorMessage:string;
  inFuture:boolean;
  unsavedChanges:boolean;
  private copyHome:any;
  private copyAway:any;

  constructor(private fixtureBetService:FixtureBetService, private fixtureService:FixtureService,
              private toastr:ToastsManager, private translateService:TranslateService) {
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
              this.toastr.success(this.translateService.instant('soe.toast.betting.saved'), this.translateService.instant('soe.toast.success'));
            },
            error => {
                this.toastr.error(
                    this.translateService.instant('soe.toast.failed'),
                    this.translateService.instant('soe.toast.error'));
            });
  }

  checkUnsavedChanges() {
    if (this.fixtureBet.home_goals === null || this.fixtureBet.away_goals === null) {
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
