/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input } from '@angular/core';
import { AccidentDiscount } from '../../discount';
import { AccidentDiscountsService } from '../../discount.service';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Logger } from 'angular2-logger/core';

@Component({
  selector: 'select-accident-discount-type',
  templateUrl: './select.html'
})
export class SelectAccidentDiscountComponent {

  @Input() selectedDiscountId: number = 0;
  @Output() selected: EventEmitter<AccidentDiscount> = new EventEmitter<AccidentDiscount>();

  private dataItems: Array<any> = [];
  private selectedDiscount: AccidentDiscount = new AccidentDiscount();
  private loadedDiscounts: AccidentDiscount[] = [];

  constructor (
    private accidentDiscountsService: AccidentDiscountsService,
    private _logger: Logger,
    private loadingBar: SlimLoadingBarService) { }

  ngOnInit () {
    this.loadingBar.start();
    this.accidentDiscountsService.getDiscounts().then(types => {
      this.loadedDiscounts = types;
      if (!this.selectedDiscountId) {
        this.selectedDiscountId = 1;
      }

      this.dataItems = types.map(x => {
        return {
          label: x.title,
          value: x.id
        };
      });

      let discountType = this.loadedDiscounts.find(discoType => discoType.id === this.selectedDiscountId);
      this.selected.emit(discountType);
      this.loadingBar.complete();
    }).catch((err) => {
      this.loadingBar.complete();
      this._logger.error(err);
    });
  }

  onSelected(event): void {
    this.selectedDiscount = this.loadedDiscounts.find(function (el) {
      return el.id === event.value;
    });

    this.selected.emit(this.selectedDiscount);
  }
}
