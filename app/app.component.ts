import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';
import {RegistrationComponent} from './registration.component';
import {LoginComponent} from './login.component';

@Component({
  selector: 'soe-app',
  templateUrl: 'app/app.component.html',
  pipes: [TranslatePipe],
  directives: [ROUTER_DIRECTIVES]
})
@Routes([
  {path: '/registration', component: RegistrationComponent},
  {path: '/login', component: LoginComponent}
])
export class AppComponent implements OnInit {
  constructor(private router:Router, translate:TranslateService) {
    var userLang = navigator.language.split('-')[0]; // use navigator lang if available
    userLang = /(de|en)/gi.test(userLang) ? userLang : 'de';

    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('de');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(userLang);
  }

  ngOnInit() {
    this.router.navigate(['/registration'])
  }
}
