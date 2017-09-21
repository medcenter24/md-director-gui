/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { DiscountService } from '../../discount.service';
import { Logger } from 'angular2-logger/core';
import { Discount } from '../../discount';

@Component({
  selector: 'nga-select-discount-type',
  templateUrl: './select.html',
})
export class SelectDiscountComponent implements OnInit {

  @Input() selectedDiscountId: number = 0;
  @Output() selected: EventEmitter<Discount> = new EventEmitter<Discount>();
  @Output() init: EventEmitter<string> = new EventEmitter<string>();
  @Output() loaded: EventEmitter<string> = new EventEmitter<string>();

  isLoaded: boolean = false;
  private dataItems: Array<any> = [];
  private selectedDiscount: Discount = new Discount();
  private loadedDiscounts: Discount[] = [];

  constructor (
    private discountsService: DiscountService,
    private _logger: Logger) { }

  ngOnInit () {
    this.init.emit('SelectDiscountComponent');
    this.discountsService.getDiscounts().then(types => {
      this.loadedDiscounts = types;
      if (!this.selectedDiscountId) {
        this.selectedDiscountId = 1;
      }

      this.dataItems = types.map(x => {
        return {
          label: x.title,
          value: x.id,
        };
      });

      const discountType = this.loadedDiscounts.find(discoType => +discoType.id === +this.selectedDiscountId);
      this.selected.emit(discountType);
      this.isLoaded = true;
      this.loaded.emit('SelectDiscountComponent');
    }).catch((err) => {
      this._logger.error(err);
      this.loaded.emit('SelectDiscountComponent');
    });
  }

  onSelected(event): void {
    this.selectedDiscount = this.loadedDiscounts.find(function (el) {
      return el.id === event.value;
    });

    this.selected.emit(this.selectedDiscount);
  }
}
