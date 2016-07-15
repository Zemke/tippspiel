import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {FixturesListComponent} from './fixtures-list.component';
import {ChampBetComponent} from './champ-bet.component';
import {UserService} from './user.service';

@Component({
  selector: 'soe-home',
  templateUrl: 'app/home.component.html',
  directives: [MDL, FixturesListComponent, ChampBetComponent],
  pipes: [TranslatePipe]
})
export class HomeComponent {
  champBetAllowed:boolean;
  finalRoundStart:Date;
  loggedIn:boolean;

  constructor(private userService:UserService) {
    this.checkIfChampBetIsStillAllowed();
    this.loggedIn = localStorage.hasOwnProperty('user_token');
  }

  private checkIfChampBetIsStillAllowed() {
    this.userService.checkIfChampBetIsStillAllowed().subscribe(
        (champBetAllowed:any) => {
          this.champBetAllowed = champBetAllowed.champBetAllowed;
          this.finalRoundStart = champBetAllowed.finalRoundStart;
        }
    );
  };
}
