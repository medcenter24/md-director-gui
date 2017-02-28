/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'diagnose-card',
    templateUrl: './diagnose.html'
})
export class Diagnose {

    @Input() diagnose: any;
    @Output() diagnoseSaved: EventEmitter<string> = new EventEmitter<string>();

    constructor () {}

    onChange(value: string) {
        this.diagnoseSaved.emit(value);
    }
}

interface diagnose {
    id: number;
    title: string;
    description: string;
}
