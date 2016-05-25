import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {StandingService} from './standing.service';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {BetResultComponent} from './bet-result.component';

@Component({
  selector: 'soe-table',
  templateUrl: 'app/standing.component.html',
  directives: [MDL, BetResultComponent],
  pipes: [TranslatePipe]
})
export class StandingComponent implements OnInit {
  standings:any[];
  errorMessage:any;

  constructor(private standingService:StandingService) {

  }

  ngOnInit() {
    this.getStandings()
  }

  getStandings() {
    this.standingService.getStandings()
        .subscribe(
            standings => this.standings = standings,
            error =>  this.errorMessage = <any>error);
  }
}
