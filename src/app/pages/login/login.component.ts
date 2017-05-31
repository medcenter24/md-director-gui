import { Component } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import 'style-loader!./login.scss';
import { AuthenticationService } from '../../components/auth/authentication.service';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'login',
  templateUrl: './login.html',
})
export class Login {

  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public showError: boolean = false;

  constructor (private fb: FormBuilder,
               private authenticationService: AuthenticationService,
               private router: Router,
               private loadingBar: SlimLoadingBarService
  ) {
    this.form = fb.group({
      'email': [ '', Validators.compose([ Validators.required, Validators.minLength(4) ]) ],
      'password': [ '', Validators.compose([ Validators.required, Validators.minLength(4) ]) ]
    });

    this.email = this.form.controls[ 'email' ];
    this.password = this.form.controls[ 'password' ];
  }

  public onSubmit (values: Object): void {
    this.loadingBar.start();
    this.submitted = true;
    this.showError = false;
    if (this.form.valid) {
      // your code goes here
      this.authenticationService.login(this.email.value, this.password.value)
        .subscribe(result => {
          this.loadingBar.complete();
          this.router.navigate(['/']);
          this.submitted = false;
        }, error => {
          this.showError = true;
          this.loadingBar.complete();
          this.submitted = false;
        });
    }
  }
}
