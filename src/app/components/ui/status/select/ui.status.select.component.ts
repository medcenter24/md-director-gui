/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LoadableComponent } from '../../../core/components/componentLoader';

@Component({
  selector: 'nga-ui-status-select',
  template: `<p-dropdown *ngIf="statuses.length" [options]="statuses"
                        [(ngModel)]="status"
                        [placeholder]="'Status' | translate"
                        appendTo="body"
                        (onChange)="onChange($event)"
      ></p-dropdown>`,
})
export class UiStatusSelectComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'UiStatusSelectComponent';

  @Input() status: string = 'new';
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  statuses: any[] = [];

  constructor(
    public translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.startLoader();
    this.translateService.get('Yes').subscribe(() => {
      this.stopLoader();
      this.statuses = [
        { label: this.translateService.instant('New'), value: 'new' },
        { label: this.translateService.instant('Sent'), value: 'sent' },
        { label: this.translateService.instant('Paid'), value: 'paid' },
      ];
    });
  }

  onChange(event): void {
    this.selected.emit(event.value);
  }

}

