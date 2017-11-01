/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { ApiErrorComponent } from './apiError.component';
import { ApiErrorService } from './apiError.service';

@NgModule({
    imports: [],
    declarations: [
        ApiErrorComponent,
    ],
    providers: [
        ApiErrorService,
    ],
})
export class ApiErrorModule {}
