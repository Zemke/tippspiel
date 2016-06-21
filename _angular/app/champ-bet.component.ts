import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {UserService} from './user.service';

@Component({
  selector: 'soe-champ-bet',
  template: require('app/champ-bet.component.html!text'),
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class ChampBetComponent {
  teams:any[];
  champBet:any;
  submitting:boolean = false;
  saved:boolean;

  constructor(private userService:UserService) {
    this.getTeams();
    // TODO Initialize select box if the user has already placed a bit for this.
  }

  private getTeams() {
    this.userService.getTeams().subscribe(teams => this.teams = teams);
  }
  
  onChange(champBet) {
    this.submitting = true;
    this.userService.postChampBet(champBet).subscribe(teams => {
      this.champBet = champBet;
      this.saved = true;
      this.submitting = false;
      // TODO Toast
    }, err => {
      this.saved = false;
      this.submitting = false;
      // TODO Toast
    });
  }
}
