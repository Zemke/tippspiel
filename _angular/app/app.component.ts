    import {Component, AfterViewInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {RegistrationComponent} from './registration.component';
import {LoginComponent} from './login.component';
import {HomeComponent} from './home.component';
import {StandingComponent} from './standing.component';
import {UserService} from './user.service';
import {User} from './user';
import {GeneralService} from './general.service';
import {PaymentComponent} from './payment.component';
import {Title} from '@angular/platform-browser';
import {FixturesListComponent} from './fixtures-list.component';
import {UsersFixturesListComponent} from './users-fixtures-list.component';
import {ChampBetComponent} from './champ-bet.component';

@Component({
  selector: 'soe-app',
  template: require('app/app.component.html!text'),
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES, ChampBetComponent]
})
@Routes([
  {path: '/', component: StandingComponent},
  {path: '/user-bets/:userId', component: FixturesListComponent},
  {path: '/fixture-bets/:fixtureId', component: UsersFixturesListComponent},
  {path: '/bets', component: HomeComponent},
  {path: '/registration', component: RegistrationComponent},
  {path: '/login', component: LoginComponent},
  {path: '/payment', component: PaymentComponent}
])
export class AppComponent implements AfterViewInit {
  user:User;
  userLang:string;
  version:string;

  constructor(private router:Router, private translate:TranslateService, private userService:UserService,
              private generalService:GeneralService, private title:Title) {
    this.doStuffForThei18nStuff(translate);
    this.getAuthenticatedUser();
    this.generalService.getShieldInfo().subscribe(
        (res:any) => this.version = res.value
    );
    this.translate.get('soe.title').subscribe(
        res => this.title.setTitle(res)
    );
  }

  ngAfterViewInit():any {
    document.querySelector('.mdl-layout__drawer').addEventListener('click', function () {
      document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
    });
  }

  private getAuthenticatedUser() {
    this.userService.getUserByToken()
        .subscribe(
            (user:User) => this.user = user
        );
  }

  private doStuffForThei18nStuff(translate:TranslateService) {
    this.userLang = localStorage.getItem('lang');

    if (this.userLang !== 'en' && this.userLang !== 'de') {
      this.userLang = navigator.language.split('-')[0];
      this.userLang = /(de|en)/gi.test(this.userLang) ? this.userLang : 'en';
      localStorage.setItem('lang', this.userLang);
    }

    translate.setDefaultLang('en');
    translate.use(this.userLang);
  };

  logout() {
    localStorage.removeItem('user_token');
    location.href = '/';
  }

  switchLang() {
    if (this.userLang === 'en') {
      this.userLang = 'de';
    } else {
      this.userLang = 'en';
    }

    this.translate.use(this.userLang);
    localStorage.setItem('lang', this.userLang);
    this.translate.get('soe.title').subscribe(
        res => this.title.setTitle(res)
    );
  }
}
