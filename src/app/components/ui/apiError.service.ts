/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class ApiErrorService {

    constructor(
        private _state: GlobalState,
        private translate: TranslateService) {
    }

    show (error) {
        // to be sure that I have translations
        this.translate.get('Yes').subscribe(() => {

            let msg = '<div class="api-error-msg"><div class="lead">';
            msg += this.translate.instant('Please, fix these issues');
            msg += '</div><ul>';

            const errors = error.json().errors;
            for (const title in errors) {
                if (errors.hasOwnProperty(title) && errors[title]) {
                    const translatedTitle = this.translate.instant(title);
                    let translatedErrors = '';
                    errors[title].forEach((val) => {
                        translatedErrors += `<li>${this.translate.instant(val)}</li>`;
                    });
                    msg += `<div class="error-item offset-bottom10">
                                <h5 class="text-muted">${translatedTitle}</h5>
                                ${translatedErrors}
                            </div>`;
                }
            }
            msg += '</ul></div>';

            this._state.notifyDataChanged('confirmDialog', {
                header: this.translate.instant('Error'),
                message: msg,
                acceptVisible: false,
            });
        });
    }
}
