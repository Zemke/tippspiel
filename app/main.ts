import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {
    TRANSLATE_PROVIDERS,
    TranslateService,
    TranslateStaticLoader,
    TranslateLoader
} from 'ng2-translate/ng2-translate';
import {AppComponent} from './app.component';
import {ROUTER_PROVIDERS} from 'angular2/router';
import {provide} from 'angular2/core';

bootstrap(AppComponent, [
  ROUTER_PROVIDERS,
  HTTP_PROVIDERS,
  TRANSLATE_PROVIDERS,
  provide(TranslateLoader, {
    useFactory: (http:Http) => new TranslateStaticLoader(http, 'i18n', '.json'),
    deps: [Http]
  }),
  // use TranslateService here, and not TRANSLATE_PROVIDERS (which will define a default TranslateStaticLoader)
  TranslateService
]);
