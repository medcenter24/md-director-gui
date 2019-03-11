/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { GlobalState } from '../../global.state';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ApiErrorService {

    constructor(
        private _state: GlobalState,
        private translate: TranslateService) {
    }

    show (response: HttpErrorResponse) {
        // to be sure that I have translations
        this.translate.get('Yes').subscribe(() => {

            let msg = '<div class="api-error-msg"><div class="lead">';
            msg += this.translate.instant('Please, fix these issues');
            msg += '</div><ul>';

            const errors = response.error.errors;
            for (const title in errors) {
                if (errors.hasOwnProperty(title) && errors[title]) {
                    const translatedTitle = this.translate.instant(title);
                    let translatedErrors = '';
                    errors[title].forEach((val) => {
                        translatedErrors += `<li>${this.getErrorMessage(val)}</li>`;
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

  /**
   * i18n needs to be initialized before that method
   * @param {string} val
   * @returns {string}
   */
    private getErrorMessage(val: string): string {
      const m = val.match(/^The (.*) field is required\.$/);
      if (m) {
        val = this.translate.instant('The ? field is required.', { value: this.translate.instant(m[1]) });
      }
      return val;
    }
}
