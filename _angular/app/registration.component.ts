import {Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {User} from './user';
import {MDL} from './material-design-lite-upgrade-element.directive';
import {UserService} from './user.service';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'soe-registration',
  templateUrl: 'app/registration.component.html',
  directives: [MDL],
  pipes: [TranslatePipe]
})
export class RegistrationComponent {
  user = new User(1, '', '', '', '', '', '');
  errMsg:string;
  emailConfirm:string;
  passwordConfirm:string;

  constructor(private userService:UserService, private toastr:ToastsManager,
              private translateService:TranslateService) {
  }

  onSubmit() {
    if (this.user.email !== this.emailConfirm) {
      this.toastr.error(
          this.translateService.instant('soe.registration.emailUnmatch'),
          this.translateService.instant('soe.toast.error'));
      return;
    } else if (this.user.password !== this.passwordConfirm) {
      this.toastr.error(
          this.translateService.instant('soe.registration.passwordUnmatch'),
          this.translateService.instant('soe.toast.error'));
      return;
    }

    this.userService.addUser(this.user.first_name, this.user.last_name, this.user.email, this.user.password)
        .subscribe(
            (response:any) => {localStorage.setItem('user_token', response.token);  location.href = '/payment'},
            error => {
              this.toastr.error(
                  this.translateService.instant('soe.toast.failed'),
                  this.translateService.instant('soe.toast.error'));
            });
  }
}