/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable()
export abstract class LoadableComponent {

    @Output() init: EventEmitter<string> = new EventEmitter<string>();
    @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

    // should be provided just for loader control to check which component has been loaded
    protected abstract componentName: string;

    onInit(name: string): void {
        this.init.emit(name);
    }

    onLoaded(name: string): void {
        this.loaded.emit(name);
    }

    initComponent(): void {
        this.onInit(this.componentName);
    }

    loadedComponent(): void {
        this.onLoaded(this.componentName);
    }
}
