/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { EventEmitter, Injectable, Output } from '@angular/core';

/**
 * Component which can be loaded by other components or has components which should be loaded
 */
@Injectable()
export abstract class LoadableComponent {

    @Output() private init: EventEmitter<string> = new EventEmitter<string>();
    @Output() private loaded: EventEmitter<string> = new EventEmitter<string>();

    // should be provided just for loader control to check which component has been loaded
    protected abstract componentName: string;

    // component was initialized
    onInit(name: string): void {
        this.init.emit(name);
    }

    // component loaded
    onLoaded(name: string): void {
        this.loaded.emit(name);
    }

    // init current component
    initComponent(): void {
        this.onInit(this.componentName);
    }

    // current component has been loaded
    loadedComponent(): void {
        this.onLoaded(this.componentName);
    }
}
