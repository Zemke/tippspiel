import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS, Http} from '@angular/http';
import {ROUTER_PROVIDERS} from '@angular/router';
import {
    TRANSLATE_PROVIDERS,
    TranslateService,
    TranslateStaticLoader,
    TranslateLoader
} from 'ng2-translate/ng2-translate';
import {AppComponent} from './app.component';
import {provide} from '@angular/core';
import {UserService} from './user.service';
import 'rxjs/Rx';
import {FixtureService} from './fixture.service';
import {FixtureBetService} from './fixture-bet.service';

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  TRANSLATE_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(TranslateLoader, {
    useFactory: (http:Http) => new TranslateStaticLoader(http, 'i18n', '.json'),
    deps: [Http]
  }),
  // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
  TranslateService,
  UserService,
  FixtureService,
  FixtureBetService
]);
