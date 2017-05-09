/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Accident } from '../../../accident/accident';
import { AccidentsService } from '../../../accident/accidents.service';
import { Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { AccidentType } from '../../../accident/components/type/type';
import { AccidentDiscount } from '../../../accident/components/discount/discount';
import { Patient } from '../../../patient/patient';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../global.state';
import { SelectAccidentComponent } from '../../../accident/components/select/select.component';

@Component({
  selector: 'case-editor',
  templateUrl: './editor.html'
})
export class CaseEditorComponent {

  @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('parentSelector')
    private parentSelector: SelectAccidentComponent;

  msgs: Message[] = [];

  accident: Accident;
  patient: Patient;
  appliedTime: Date;
  maxDate: Date;
  discountValue: number = 0;
  discountType: AccidentDiscount;

  totalAmount: number = 0;
  totalIncome: number = 0;

  totalIncomeFormula: string = '';

  constructor (private route: ActivatedRoute, private accidentsService: AccidentsService,
               private loadingBar: SlimLoadingBarService, private translate: TranslateService,
              private _logger: Logger, private _state: GlobalState) {
  }

  ngOnInit () {
    this.translate.get('general.without_discount').subscribe(res => {
      this.totalIncomeFormula = res;
    });
    this.maxDate = new Date();
    this.appliedTime = new Date();

    this.route.params
      // (+) converts string 'id' to a number
      .subscribe((params: Params) => {
        this.loadingBar.start();
        this.accidentsService.getAccident(+params[ 'id' ]).then((accident: Accident) => {
          this.accident = accident ? accident : new Accident();
          this.appliedTime = new Date(this.accident.created_at);

          this._state.notifyDataChanged('menu.activeLink', {title: 'general.menu.cases'});

          this.loadingBar.complete();
        }).catch((err) => {
          this._logger.error(err);
          this.loadingBar.complete();
        });
      });
  }

  onSave(): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: this.translate.instant('general.not_saved') + '!', detail: 'Save method still has not been implemented!'});
    this._state.notifyDataChanged('growl', this.msgs);
    this.loadingBar.start();
    setTimeout(() => this.loadingBar.complete(), 3000)
  }

  onCaseTypeSelected(type): void {
    this.accident.caseable_type = type;
  }

  onAccidentTypeSelected(accidentType: AccidentType): void {
    this.accident.accident_type_id = accidentType.id;
  }

  onAccidentSelected(accident: Accident): void {
    this.accident.parent_id = 0;
    setTimeout(() => this.accident.parent_id = accident.id, 100);
  }

  onParentDeleted(): void {
    this.accident.parent_id = 0;
    this.parentSelector.clear();
  }

  onServicesSelectorPriceChanged(servicesPrice): void {
    this.totalAmount = servicesPrice;
    this.recalculatePrice();
  }

  onDiscountTypeSelected(discountType: AccidentDiscount): void {
    this.discountType = discountType;
    this.recalculatePrice();
  }

  onDiscountValueChanged(): void {
    this.recalculatePrice();
  }

  private recalculatePrice(): void {
    this.totalIncome = 0;
    if (this.totalAmount && this.discountType && this.discountValue) {
      if (this.discountType.title === '%') {
        // *
        this.totalIncome = this.totalAmount - this.discountValue * this.totalAmount / 100;
        this.totalIncome = +this.totalIncome.toFixed(2);
        this.totalIncomeFormula = this.totalAmount + ' - ' + this.discountValue + ' * ' + this.totalAmount + ' / 100';
      } else if (this.discountType.title === 'EUR') {
        // -
        this.totalIncome = this.totalAmount - this.discountValue;
        this.totalIncomeFormula = this.totalAmount + ' - ' + this.discountValue;
      } else {
        this.totalIncome = this.totalAmount;
        this.totalIncomeFormula = this.translate.instant('general.without_discount');
      }
    } else {
      this.totalIncome = this.totalAmount;
      this.totalIncomeFormula = this.translate.instant('general.without_discount');
    }
  }
}
