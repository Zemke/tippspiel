import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {FixtureService} from './fixture.service';
import {Fixture} from './fixture';

@Component({
  selector: 'soe-fixtures-list',
  templateUrl: 'app/fixtures-list.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class FixturesListComponent  implements OnInit {
  fixtures:Fixture[];
  errorMessage:any;

  constructor(private fixtureService:FixtureService) {

  }

  ngOnInit() {
    this.getFixtures()
  }

  getFixtures() {
    this.fixtureService.getFixtures()
        .subscribe(
            fixtures => this.fixtures = fixtures,
            error =>  this.errorMessage = <any>error);
  }

  get debugFixtures() {
    return JSON.stringify(this.fixtures, null, 2);
  }
}

