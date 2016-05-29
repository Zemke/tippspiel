import {Component} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {RegistrationComponent} from './registration.component';
import {LoginComponent} from './login.component';
import {HomeComponent} from './home.component';
import {StandingComponent} from './standing.component';
import {UserService} from './user.service';
import {User} from './user';

@Component({
  selector: 'soe-app',
  templateUrl: 'app/app.component.html',
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/', component: HomeComponent},
  {path: '/standings', component: StandingComponent},
  {path: '/registration', component: RegistrationComponent},
  {path: '/login', component: LoginComponent}
])
export class AppComponent {
  user:User;
  constructor(private router:Router, translate:TranslateService, private userService:UserService) {
    this.doStuffForThei18nStuff(translate);
    this.getAuthenticatedUser();
  }

  private getAuthenticatedUser() {
    this.userService.getUserByToken()
        .subscribe(
            (user:User) => this.user = user
        );
  }

  private doStuffForThei18nStuff(translate:TranslateService) {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(de|en)/gi.test(userLang) ? userLang : 'de';

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  };
}
