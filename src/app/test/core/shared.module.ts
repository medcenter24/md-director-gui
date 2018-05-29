/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */


import { NgModule } from '@angular/core';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../global.state';

@NgModule({
  providers: [
    Logger,
    GlobalState,
  ],
})
export class SharedModule {
}
