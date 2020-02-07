/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2020 (original work) MedCenter24.com;
 */

import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'nga-toast-component',
  template: `<p-toast [style]="{marginTop: '80px'}"></p-toast>`,
  providers: [MessageService],
})
export class UiToastComponent implements OnInit {

  messageLoaded: boolean = false;

  constructor (
    private messageService: MessageService,
    private translateService: TranslateService,
  ) {
  }

  ngOnInit(): void {
    this.initTranslations();
  }

  private initTranslations(): void {
    this.translateService.get( 'Yes' ).subscribe( () => {
      this.messageLoaded = true;
    } );
  }

  showMessage(severity: string, summary: string, detail: string): void {
    this.messageService.add({ severity, summary, detail });
  }

  showSuccess(summary: string, detail: string) {
    this.showMessage('success', summary, detail);
  }

  // templates
  saved(): void {
    this.showSuccess(this.translateService.instant('Saved'), this.translateService.instant('Successfully saved'));
  }

}
