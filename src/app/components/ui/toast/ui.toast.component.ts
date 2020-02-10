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

  showSuccess(summary: string, detail: string): void {
    this.showMessage('success', summary, detail);
  }

  showError(summary: string, detail: string): void {
    this.showMessage('error', summary, detail);
  }

  showInfo(summary: string, detail: string): void {
    this.showMessage('info', summary, detail);
  }

  // templates
  saved(): void {
    this.successMessage(this.translateService.instant( 'Saved' ) );
  }

  deleted(): void {
    this.successMessage(this.translateService.instant( 'Deleted' ) );
  }

  created(): void {
    this.successMessage(this.translateService.instant('Created'));
  }

  successMessage(message: string): void {
    this.showSuccess(this.translateService.instant('Success'), message);
  }

  httpError(): void {
    this.errorMessage(this.translateService.instant('HTTP Error Occurred'));
  }

  error(): void {
    this.errorMessage(this.translateService.instant('Error Occurred'));
  }

  notFound(): void {
    this.errorMessage(this.translateService.instant('Resource not found'));
  }

  errorMessage(message: string): void {
    this.showError(this.translateService.instant('Error'), message);
  }

  infoMessage(message: string): void {
    this.showInfo(this.translateService.instant('Info'), message);
  }

}
