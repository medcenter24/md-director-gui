/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';
import { LoadableComponent } from './LoadableComponent';
import { Logger } from 'angular2-logger/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { GlobalState } from '../../../../global.state';

/**
 * Pages could implement this realization to wait till all components will be loaded
 *
 * In case that loading block don't want to be used on each of using of this component that is the best solution
 * I mean that I don't need to use LoadingService or something similar
 */
@Injectable()
export abstract class LoadingComponent extends LoadableComponent {

    protected _logger: Logger;
    protected loadingBar: SlimLoadingBarService;
    protected _state: GlobalState;
    protected onComponentsLoadingCompleted(): void { }

    private componentsList: string[] = [];

    startLoader(componentName: string = ''): void {
        if (componentName.length) {
            this._logger.debug(`+${componentName}`);
        } else {
            this._logger.warn(`+===========> Component Name is empty <============`);
        }

        if (!this.componentsList.length) {
            window.setTimeout(() => this._state.notifyDataChanged('blocker', true));
            this.loadingBar.start();
        }
        if (this.componentsList.indexOf(componentName) !== -1) {
            componentName = this.generateName(componentName);
        }

        this.componentsList.push(componentName);
    }

    stopLoader(componentName: string = 'Not provided'): void {
        this._logger.debug(`-${componentName}`);

        if (!this.deleteName(componentName)) {
            this._logger.error(`Loading is trying to stop component which has not been launched => ${componentName}`);
        }

        if (this.componentsList.length === 0) {
            this._state.notifyDataChanged('blocker', false);
            this.loadingBar.complete();
            this.onComponentsLoadingCompleted();
        }
    }

    private deleteName(componentName: string): boolean {
        let deleted = false;
        const filtered = [];
        for (const name of this.componentsList) {
            if (name.startsWith(componentName) && !deleted) {
                deleted = true;
            } else {
                filtered.push(name);
            }
        }
        this.componentsList = filtered;
        return deleted;
    }

    private generateName(name: string): string {
        const defName = name;
        let i = 0;
        while (this.componentsList.indexOf(name) !== -1) {
            name = `${defName}_${++i}`;
        }
        return name;
    }
}