/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, Input, OnInit } from '@angular/core';
import { isNumber, isObject } from 'util';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { Accident } from '../../accident';

@Component({
  selector: 'nga-accident-activity',
  templateUrl: './activity.html',
  styleUrls: ['./activity.scss'],
})
export class AccidentActivityComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'CaseActivityComponent';

  @Input() accident: Accident;

  selectedTab = null;
  tabs: any[] = [
    { id: 1, name: 'Comments' },
    { id: 2, name: 'History' },
  ];

  constructor () {
    super();
  }

  ngOnInit () {
    this.selectedTab = this.tabs[0];
  }

  selectTab(tab: any): void {
    let id = 0;
    if (isObject(tab)) {
      const pos = this.tabs.findIndex(x => x.id === tab.id);
      if (pos) {
        id = pos;
      }
    } else if (isNumber(tab) && tab >= 0) {
      this.selectedTab = this.tabs[tab];
      id = tab;
    }
    this.selectedTab = this.tabs[id];
  }
}
