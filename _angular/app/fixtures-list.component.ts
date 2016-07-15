import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {FixtureService} from './fixture.service';
import {Fixture} from './fixture';
import {FixtureComponent} from './fixture.component';
import {RouteSegment} from '@angular/router';
import {UserService} from './user.service';

@Component({
  selector: 'soe-fixtures-list',
  templateUrl: 'app/fixtures-list.component.html',
  directives: [MDL, FixtureComponent],
  pipes: [TranslatePipe]
})
export class FixturesListComponent implements OnInit {
  fixtures:Fixture[];
  errorMessage:any;
  private userId:any;
  user:any;

  constructor(private fixtureService:FixtureService, private userService:UserService,
              private routeSeg:RouteSegment) {
    this.userId = routeSeg.getParam('userId');
  }

  ngOnInit() {
    this.getFixtures()
  }

  getFixtures() {
    this.fixtureService.getFixtures(this.userId)
        .subscribe(
            fixtures => {
              if (!!this.userId) {
                this.fixtures = fixtures.filter((fixture:Fixture) => {
                  return !this.fixtureService.inFuture(fixture);
                })
              } else {
                this.fixtures = fixtures;
              }
            },
            error => this.errorMessage = <any>error);

    if (!!this.userId) {
      this.userService.getUser(this.userId).subscribe(user => this.user = user);
    }
  }

  get debugFixtures() {
    return JSON.stringify(this.fixtures, null, 2);
  }
}

