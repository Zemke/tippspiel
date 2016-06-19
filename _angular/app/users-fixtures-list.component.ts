import {Component, OnInit} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {FixtureService} from './fixture.service';
import {RouteSegment} from '@angular/router';
import {UserService} from './user.service';
import {FixtureComponent} from './fixture.component';

@Component({
  selector: 'soe-users-fixtures-list',
  templateUrl: 'app/users-fixtures-list.component.html',
  directives: [MDL, FixtureComponent],
  pipes: [TranslatePipe]
})
export class UsersFixturesListComponent implements OnInit {
  private fixtureId:string;
  fixturesByUsers:any[];

  constructor(private fixtureService:FixtureService, private userService:UserService,
              private routeSeg:RouteSegment) {
    this.fixtureId = routeSeg.getParam('fixtureId');
  }

  ngOnInit() {
    this.getFixturesOfAllUsers();
  }

  private getFixturesOfAllUsers() {
    this.fixtureService.getFixturesOfAllUsers(this.fixtureId).subscribe(
        fixturesByUsers => this.fixturesByUsers = fixturesByUsers);
  }
}
