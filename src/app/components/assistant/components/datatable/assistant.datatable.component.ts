/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableCol } from '../../../ui/datatable/datatable.col';
import { DatatableConfig } from '../../../ui/datatable/datatable.config';
import { DatatableAction } from '../../../ui/datatable/datatable.action';
import { TranslateService } from '@ngx-translate/core';
import { LoadingComponent } from '../../../core/components/componentLoader/LoadingComponent';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../global.state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { DatatableComponent } from '../../../ui/datatable/datatable.component';
import { AssistantEditorComponent } from '../editor/assistant.editor.component';
import { AssistantsService } from '../../assistant.service';
import { Assistant } from '../../assistant';

@Component({
  selector: 'nga-assistant-datatable',
  templateUrl: './assistant.datatable.html',
})
export class AssistantDatatableComponent extends LoadingComponent implements OnInit {

  protected componentName: string = 'AssistantDatatableComponent';

  @ViewChild('datatable')
  private datatable: DatatableComponent;

  @ViewChild('editAssistantForm')
  private editAssistantForm: AssistantEditorComponent;

  datatableConfig: DatatableConfig;
  langLoaded: boolean = false;
  displayDialog: boolean = false;
  assistant: Assistant;

  constructor(
    protected _logger: Logger,
    protected _state: GlobalState,
    protected loadingBar: SlimLoadingBarService,
    private translateService: TranslateService,
    private assistantService: AssistantsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.translateService.get('Yes').subscribe(() => {
      this.langLoaded = true;
      const cols = [
        new DatatableCol('title', this.translateService.instant('Title')),
        new DatatableCol('email', this.translateService.instant('E-Mail')),
        new DatatableCol('commentary', this.translateService.instant('Commentary')),
        new DatatableCol('refKey', this.translateService.instant('Ref. Key')),
      ];

      this.datatableConfig = DatatableConfig.factory({
        dataProvider: (filters: Object) => {
          return this.assistantService.getDatatableData(filters);
        },
        cols,
        refreshTitle: this.translateService.instant('Refresh'),
        controlPanel: true,
        controlPanelActions: [
          new DatatableAction(this.translateService.instant('Add'), 'fa-plus', () => {
            this.showDialogToAdd();
          }),
        ],
        onRowSelect: event => {
          this.onRowSelect(event);
        },
        sort: true,
        sortBy: 'title',
      });
    });
  }

  showDialogToAdd() {
    this.setAssistant(new Assistant());
    this.displayDialog = true;
  }

  private setAssistant(assistant: Assistant): void {
    this.assistant = assistant;
  }

  onRowSelect(event) {
    this.setAssistant(this.cloneAssistant(event.data));
    this.displayDialog = true;
  }

  private cloneAssistant(a: Assistant): Assistant {
    const assistant = new Assistant();
    for (const prop of Object.keys(a)) {
      assistant[prop] = a[prop];
    }
    return assistant;
  }

  onChanged(event): void {
    this.displayDialog = false;
    this.datatable.refresh();
  }
}

