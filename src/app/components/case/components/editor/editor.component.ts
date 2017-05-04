/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Accident } from '../../../accident/accident';
import { AccidentsService } from '../../../accident/accidents.service';
import { Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'case-editor',
  templateUrl: './editor.html'
})
export class CaseEditorComponent {

  @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

  msgs: Message[] = [];

  accident: Accident;
  appliedTime: Date;
  maxDate: Date;

  private loadingControl: Array<string> = [];

  constructor (private route: ActivatedRoute, private accidentsService: AccidentsService,
               private slimLoader: SlimLoadingBarService) { }

  ngOnInit () {

    this.maxDate = new Date();
    this.appliedTime = new Date();

    if (this.route.params['id'] && this.route.params['id'] !== 'new' ) {
      this.route.params
        // (+) converts string 'id' to a number
        .switchMap((params: Params) => this.accidentsService.getAccident(+params[ 'id' ]))
        .subscribe((accident: Accident) => {
          this.accident = accident ? accident : new Accident()
          this.appliedTime = new Date(this.accident.created_at);
        });
    } else {
      this.accident = new Accident;
    }
  }

  onSave(): void {
    this.msgs.push({severity:'error', summary:'Not saved!', detail:'Save method still has not been implemented!'});
    this.slimLoader.start();
    setTimeout(() => this.slimLoader.complete(), 3000)
  }

  onLoading(key): void {
    this.slimLoader.start();
  }

  onLoaded(key): void {
    this.slimLoader.complete();
  }
}
