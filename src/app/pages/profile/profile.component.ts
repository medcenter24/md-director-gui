/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'nga-profile',
  templateUrl: './profile.html',
})
export class ProfileComponent implements OnInit {

  constructor (private _logger: Logger,
               private loadingBar: SlimLoadingBarService,
  ) {
  }

  ngOnInit (): void {
  }

  public onSubmit (values: Object): void {
    this.loadingBar.start();
  }
}
