import {Component} from '@angular/core';
import {TranslatePipe} from 'ng2-translate/ng2-translate';
import {RegistrationFormComponent} from './registration-form.component';

@Component({
  selector: '<soe-registration></soe-registration>',
  template: `
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col">
        <div class="mdl-cell mdl-cell--12-col">
          <h1>{{ 'soe.menu.login' | translate }}</h1>
        </div>
        <soe-registration-form></soe-registration-form>
      </div>
    </div>
  `,
  directives: [RegistrationFormComponent],
  pipes: [TranslatePipe]
})
export class RegistrationComponent {
}
