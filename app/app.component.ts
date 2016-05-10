import {Component} from 'angular2/core';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';
import {RegistrationComponent} from './registration.component';

@Component({
  selector: 'soe-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES],
  pipes: [TranslatePipe]
})
@RouteConfig([
  {path: '/registration', name: 'Registration', component: RegistrationComponent}
])
export class AppComponent {
  param:string = 'world';

  constructor(translate:TranslateService) {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(de|en)/gi.test(userLang) ? userLang : 'de';

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }
}
