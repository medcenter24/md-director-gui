/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import 'style-loader!./login.scss';
import { AuthenticationService } from '../../components/auth/authentication.service';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { LocalStorageHelper } from '../../helpers/local.storage.helper';

@Component({
  selector: 'nga-login',
  templateUrl: './login.html',
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  submitted: boolean = false;
  showError: boolean = false;

  constructor (private fb: FormBuilder,
               private authenticationService: AuthenticationService,
               private router: Router,
               private storage: LocalStorageHelper,
               private loadingBar: SlimLoadingBarService,
  ) {
    this.form = fb.group({
      'email': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
    });
  }

  ngOnInit (): void {
    this.submitted = false;
    this.showError = false;
    this.email = this.form.controls[ 'email' ];
    this.password = this.form.controls[ 'password' ];
  }

  onSubmit (): void {
    this.loadingBar.start();
    this.submitted = true;
    this.showError = false;
    if (this.form.valid) {
      // your code goes here
      this.authenticationService.login(this.email.value, this.password.value)
        .subscribe(() => {
          this.loadingBar.complete();
          const lastUri = this.storage.getItem('lastActiveUri');
          this.router.navigate([lastUri ? lastUri : '/']);
          this.submitted = false;
        }, () => {
          this.showError = true;
          this.loadingBar.complete();
          this.submitted = false;
        });
    }
  }
}
