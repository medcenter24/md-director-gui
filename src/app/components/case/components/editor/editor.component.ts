/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import { ActivatedRoute, Params } from '@angular/router';
import { Accident } from '../../../accident/accident';
import { AccidentsService } from '../../../accident/accidents.service';
import { ServicesSelectorComponent } from '../../../service/components/selector/selector.component';

@Component({
  selector: 'case-editor',
  templateUrl: './editor.html'
})
export class CaseEditorComponent {

  @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('loadingBarCaseEditor') loadingBar: SlimLoadingBarComponent;

  accident: Accident;

  constructor (private route: ActivatedRoute, private accidentsService: AccidentsService) { }

  ngOnInit () {
    if (this.route.params['id'] && this.route.params['id'] !== 'new' ) {
      this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) => this.accidentsService.getAccident(+params[ 'id' ]))
        .subscribe((accident: Accident) => this.accident = accident ? accident : new Accident());
    } else {
      this.accident = new Accident;
    }

  }

  startLoading (): void {
    this.loadingBar.color = '#209e91';
    this.loadingBar.show = true;
    this.loadingBar.service.reset();
    this.loadingBar.service.start();
  }

  completeLoading (): void {
    this.loadingBar.service.complete();
    this.loadingBar.show = false;
  }

  errorLoading (): void {
    this.loadingBar.color = '#f89711';
  }

  onSubmit(): void {
    console.log('submit');
  }
}
