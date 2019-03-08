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

    @Output() protected init: EventEmitter<string> = new EventEmitter<string>();
    @Output() protected loaded: EventEmitter<string> = new EventEmitter<string>();

    // should be provided just for loader control to check which component has been loaded
    protected abstract componentName: string;

    startLoader(postfix: string = ''): void {
      this.init.emit(`_${this.componentName}${postfix}`);
    }

    stopLoader(postfix: string = ''): void {
      this.loaded.emit(`_${this.componentName}${postfix}`);
    }
}
