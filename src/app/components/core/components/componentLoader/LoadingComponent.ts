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
    protected abstract componentName;

    protected abstract _logger: Logger;
    protected abstract loadingBar: SlimLoadingBarService;
    protected abstract _state: GlobalState;
    protected onComponentsLoadingCompleted(): void { }
    private componentsList: string[] = [];
    private loading: boolean = false;

    startLoader(postfix: string = ''): void {
        const name = `${this.componentName}${postfix}`;
        this._logger.debug(`+ ${name}`);

        this.loading = true;

        if (!this.componentsList.length) {
          // if I use here setTimeout it is an issue that startLoader works after the stop loader
          this._state.notifyDataChanged('blocker', true);
          this.loadingBar.start();
        }

        if (this.componentsList.indexOf(name) !== -1) {
            postfix = this.generateName(name);
        }

        this.componentsList.push(postfix);
    }

    stopLoader(postfix: string = ''): void {
        const name = `${this.componentName}${postfix}`;
        this._logger.debug(`- ${name}`);

        if (!this.deleteName(postfix)) {
            this._logger.error(`Loading is trying to stop component which has not been launched => ${name}`);
        }

        if (this.componentsList.length === 0) {
            this.loading = false;
            this._state.notifyDataChanged('blocker', false);
            this.loadingBar.complete();
            this.onComponentsLoadingCompleted();
        }
    }

    isLoading(): boolean {
        return this.loading;
    }

    private deleteName(componentName: string): boolean {
        let deleted = false;
        const filtered = [];
        for (const name of this.componentsList) {
            if (name === componentName && !deleted) {
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
