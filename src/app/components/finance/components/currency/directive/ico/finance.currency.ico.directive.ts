/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';
import { FinanceCurrency } from '../../finance.currency';
import { FinanceCurrencyService } from '../../finance.currency.service';

@Directive({ selector: '[ngaFinanceCurrencyIco]' })
export class FinanceCurrencyIcoDirective implements OnChanges {

  @Input() ngaFinanceCurrencyIco: any;

  /**
   * Generally I need the icon for example fa fa-icon, which has 2 or more classes
   */
  private classParts: string[] = [];

  /**
   * Cached list of currencies
   */
  private currencies = null;

  ngOnChanges(): void {
    this.setSpinner();
    if (this.ngaFinanceCurrencyIco === 'percent') {
      this.setPercent();
    } else {
      this.setCurrency();
    }
  }

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private currencyService: FinanceCurrencyService,
  ) {}

  private setClass(): void {
    this.renderer.removeAttribute(this.el.nativeElement, 'class');
    this.classParts.forEach(val => this.renderer.addClass(this.el.nativeElement, val));
  }

  private setSpinner(): void {
    this.classParts = [];
    this.classParts.push('fa');
    this.classParts.push('fa-spinner');
    this.classParts.push('fa-spin');
    this.setClass();
  }

  private setPercent(): void {
    this.classParts = [];
    this.classParts.push('fa');
    this.classParts.push('fa-percent');
    this.setClass();
  }

  private setCurrency(): void {
    // currencies
    if (this.currencies === null) {
      this.currencyService.search({}).then(response => {
        this.currencies = response.data as FinanceCurrency[];
        this.setCurrencyFromCache();
      });
    } else {
      this.setCurrencyFromCache();
    }
  }

  private setCurrencyFromCache(): void {
    this.currencies.forEach((currency: FinanceCurrency) => {
      if (+currency.id === +this.ngaFinanceCurrencyIco) {
        this.classParts = currency.ico.split(' ');
        this.setClass();
      }
    });
  }
}
