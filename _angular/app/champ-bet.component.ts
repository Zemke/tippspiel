import {Component} from '@angular/core';
import {DatePipe} from '@angular/common';
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
  private startOfFinalStage:Date = new Date('2016-06-25T13:00:00Z');
  deadline:string = new DatePipe().transform(this.startOfFinalStage, 'fullDate')
      + ', ' + new DatePipe().transform(this.startOfFinalStage, 'shortTime');

  constructor(private userService:UserService) {
    this.getTeams();
    this.userService.getChampBet().subscribe(champBet => this.champBet = champBet);
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
