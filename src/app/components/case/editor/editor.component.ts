/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { SlimLoadingBarComponent } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../global.state';
//import { ActivatedRoute, Params } from '@angular/router';
//import { AccidentsService } from '../../accident/accidents.service';
import { Accident } from '../../accident/accident';

@Component({
    selector: 'case-editor',
    templateUrl: './editor.html'
})
export class CaseEditorComponent {

    @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('loadingBarCaseEditor') loadingBar: SlimLoadingBarComponent;

    accident: Accident;

    constructor (private _state: GlobalState,
                 /*private route: ActivatedRoute,
                 private accidentService: AccidentsService*/
    ) { }

    ngOnInit() {
        this._state.notifyDataChanged('menu.activeLink', {title: 'Creation of a new case'});

/*        this.route.params
            // (+) converts string 'id' to a number
            .switchMap((params: Params) => this.accidentService.getAccident(+params['id']))
            .subscribe((accident: Accident) => this.accident = accident ? accident : new Accident());*/
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
}
