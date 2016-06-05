import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {RegistrationComponent} from './registration.component';
import {LoginComponent} from './login.component';
import {HomeComponent} from './home.component';
import {StandingComponent} from './standing.component';
import {UserService} from './user.service';
import {User} from './user';
import {GeneralService} from './general.service';

@Component({
  selector: 'soe-app',
  templateUrl: 'app/app.component.html',
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/', component: StandingComponent},
  {path: '/bets', component: HomeComponent},
  {path: '/registration', component: RegistrationComponent},
  {path: '/login', component: LoginComponent}
])
export class AppComponent {
  user:User;
  userLang:string;
  version:string;

  constructor(private router:Router, private translate:TranslateService, private userService:UserService, private generalService:GeneralService) {
    this.doStuffForThei18nStuff(translate);
    this.getAuthenticatedUser();
    this.generalService.getShieldInfo().subscribe(
        (res:any) => this.version = res.value
    );
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
  }
}
