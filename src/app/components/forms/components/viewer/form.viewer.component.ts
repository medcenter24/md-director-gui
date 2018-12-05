/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { FormService } from '../../form.service';

@Component({
  selector: 'nga-form-viewer',
  template: `
    <span
            class="fa fa-file-pdf-o mr-2"
            (click)="downloadPdf()"
            title="{{ 'Save as PDF' | translate }}"></span>
    <span
            class="fa fa-print mr-2"
            (click)="print()"
            title="{{ 'Print' | translate }}"
    ></span>
    <span
            class="fa fa-window-maximize"
            (click)="preview()"
            title="{{ 'Preview' | translate }}"
    ></span>
    
    <iframe id="printf" name="printf" style="display: none;"></iframe>

    <p-dialog [(visible)]="formPreviewerVisible"
              [width]="800"
              appendTo="body">
      <p-header>
        {{ 'Report Preview' | translate }}
      </p-header>
      <div #previewContainer></div>
    </p-dialog>
  `,
})
export class FormViewerComponent extends LoadableComponent {
  protected componentName: string = 'FormViewerComponent';

  /**
   * Identifier of the form to show
   */
  @Input() formId: number;
  /**
   * Identifier of the source of the data for this form
   */
  @Input() formableId: number;

  @ViewChild('previewContainer')
  previewContainer: ElementRef;

  formPreviewerVisible: boolean = false;
  private errorMessage: string = '';
  private errorTitle: string = '';

  constructor(
    protected loadingBar: SlimLoadingBarService,
    protected _logger: Logger,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    protected formService: FormService,
  ) {
    super();
    this.translateService.get('`form` and/or `data source` has not been provided').subscribe(res => {
      this.errorMessage = res;
      this.errorTitle = this.translateService.instant('Error');
    });
  }

  private valid(): boolean {
    let res: boolean = true;
    if (!this.formId || !this.formableId) {
      const msgs = [];
      msgs.push({ severity: 'error', summary: this.errorTitle, detail: this.errorMessage });
      this._state.notifyDataChanged('growl', msgs);
      res = false;
    }
    return res;
  }

  downloadPdf(): void {
    if (this.valid()) {
      this.formService.downloadPdf(this.formId, this.formableId);
    }
  }

  print(): void {
    if (this.valid()) {
      const postfix = 'Print';
      this.startLoader('Print');
      this.formService.getReportHtml(this.formId, this.formableId)
        .then(html => {
          this.loadingBar.complete();
          const newWin = window.frames['printf'];
          newWin.document.write(`<body onload="window.print()">${html}</body>`);
          newWin.document.close();
        })
        .catch(() => this.stopLoader(postfix));
    }
  }

  preview(): void {
    if (this.valid()) {
      this.formService.getReportHtml(this.formId, this.formableId)
        .then((html: string) => {
          this.formPreviewerVisible = true;
          this.previewContainer.nativeElement.innerHTML = html;
        }).catch();
    }
  }
}
