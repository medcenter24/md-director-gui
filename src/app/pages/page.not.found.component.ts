/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { Component } from '@angular/core';

@Component({
  template: `<h2 translate>404_sorry_text</h2>
    <a routerLink="/dashboard" translate>go_to_dashboard</a>`,
})
export class PageNotFoundComponent {}
