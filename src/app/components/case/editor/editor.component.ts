/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, Output, EventEmitter, ViewChild} from '@angular/core';
import {SlimLoadingBarComponent} from "ng2-slim-loading-bar";
import {GlobalState} from "../../../global.state";

@Component({
    selector: 'case-editor',
    templateUrl: './editor.html'
})
export class CaseEditorComponent {

    @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild('loadingBarCaseEditor')
        private loadingBar: SlimLoadingBarComponent;

    accidentId: number = 0;

    constructor (private _state:GlobalState) { }

    ngOnInit() {
        this._state.notifyDataChanged('menu.activeLink', {title: 'Creation of a new case'});
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
