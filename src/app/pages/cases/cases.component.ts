/*
 * Copyright (c) 2017. 
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, ViewEncapsulation, ViewChild} from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import {SlimLoadingBarComponent} from "ng2-slim-loading-bar";
import {Response} from "@angular/http";
import {AccidentsService} from "../../components/accident/accidents.service";
import {ModalComponent} from "ng2-bs3-modal/components/modal";

@Component({
  selector: 'basic-tables',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [],
  templateUrl: './cases.html',
})
export class Cases {

  @ViewChild('loadingBarCasesList')
    private loadingBar: SlimLoadingBarComponent;

  @ViewChild('errorDialog')
    private errorDialog: ModalComponent;

  query: string = '';

  deleteDialogEvent: any = null;
  titleForDeletion: string = '';
  deleteProcess: boolean = false;
  errorMessage: string = '';
  errorResponse: Response = null;

  settings = {
    mode: 'click-to-edit',
    hideSubHeader: true,
    actions: false,
    columns: {
      title: {
        title: 'Title',
        type: 'string'
      },
      ref_num: {
        title: 'Ref. Number',
        type: 'string'
      },
      created_at: {
        title: 'created_at',
        type: 'string'
      }
    }
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(protected service: AccidentsService) { }

  ngOnInit(): void {
    this.startLoading();
    this.service.getAccidents().then((data) => {
      this.source.load(data);
      this.completeLoading()
    }).catch((response) => {
      this.showError('Something bad happened, you can\'t load list of cases', response);
      this.errorLoading();
    });
  }

  startLoading(): void {
    this.loadingBar.color = '#209e91';
    this.loadingBar.show = true;
    this.loadingBar.service.reset();
    this.loadingBar.service.start();
  }

  completeLoading(): void {
    this.loadingBar.service.complete();
    this.loadingBar.show = false;
  }

  errorLoading(): void {
    this.loadingBar.color = '#f89711';
  }

  private showError(message: string, response: Response = null): void {
    this.errorMessage = message;
    if (response) {
      this.errorResponse = response;
    }
    this.errorDialog.open('sm');
  }
}
