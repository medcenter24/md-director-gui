/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class ApiErrorService {

    show (error) {
        console.log('show api error', error);
    }

}