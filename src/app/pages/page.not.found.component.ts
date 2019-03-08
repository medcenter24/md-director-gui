/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';

@Component({
  styles: [],
  template: `
    <div class="row">
      <div class="col-sm-8 center-block">
        <h1 translate>404_sorry_text</h1>
        <a class="btn btn-lg btn-primary mt-3" routerLink="/dashboard" translate>go_to_dashboard</a>
      </div>
    </div>
  `,
})
export class PageNotFoundComponent {}
