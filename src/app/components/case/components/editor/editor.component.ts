/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Accident } from '../../../accident/accident';
import { AccidentsService } from '../../../accident/accidents.service';
import { Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { AccidentType } from '../../../accident/components/type/type';
import { Patient } from '../../../patient/patient';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../global.state';
import { SelectAccidentComponent } from '../../../accident/components/select/select.component';
import { PatientsService } from '../../../patient/patients.service';
import { DoctorAccident } from '../../../doctorAccident/doctorAccident';
import { HospitalAccident } from '../../../hospitalAccident/hospitalAccident';
import { CasesService } from '../../cases.service';
import { Discount } from '../../../discount/discount';

@Component({
  selector: 'case-editor',
  templateUrl: './editor.html'
})
export class CaseEditorComponent {

  @Output() loaded: EventEmitter<null> = new EventEmitter<null>();

  @ViewChild('parentSelector')
    private parentSelector: SelectAccidentComponent;

  isLoaded: boolean = false;
  blocked: boolean = false;

  msgs: Message[] = [];

  accident: Accident;
  patient: Patient;
  appliedTime: Date;
  maxDate: Date;
  discountValue: number = 0;
  discountType: Discount;
  phone: string;
  doctorAccident: DoctorAccident;
  hospitalAccident: HospitalAccident;

  totalAmount: number = 0;
  totalIncome: number = 0;

  totalIncomeFormula: string = '';

  constructor (private route: ActivatedRoute,
               private loadingBar: SlimLoadingBarService, private translate: TranslateService,
               private _logger: Logger, private _state: GlobalState, private patientService: PatientsService,
               private accidentsService: AccidentsService,
               private caseService: CasesService,
               private router: Router
  ) {
  }

  ngOnInit () {
    this.translate.get('general.without_discount').subscribe(res => {
      this.totalIncomeFormula = res;
    });
    this.maxDate = new Date();
    this.appliedTime = new Date();

    this.accident = new Accident;

    this._state.notifyDataChanged('menu.activeLink', {title: 'general.menu.cases'});

    this.route.params
      .subscribe((params: Params) => {
        if (+params[ 'id' ]) {
          this.loadingBar.start();

          this.accidentsService.getAccident(+params[ 'id' ]).then((accident: Accident) => {
            this._state.notifyDataChanged('menu.activeLink', {title: 'general.menu.cases'});
            this.accident = accident ? accident : new Accident();
            this.appliedTime = new Date(this.accident.created_at);
            this.discountValue = 0; // +this.accident.discount_value;
            this.loadPatient();
            this.loadCaseable();
            this.recalculatePrice();
            this.loadingBar.complete();
            this.isLoaded = true;
          }).catch((err) => {
            this.loadingBar.complete();
            if (err.status === 404) {
              this.router.navigate([ 'pages/cases' ]);
            } else {
              this._logger.error(err);
            }
          });

          /*
          If I need to improve performance of this form, it will be good start point
          for now it is a waste of the time
          this.caseService.getExtendedCase(+params[ 'id' ])
            .then((caseAccident: ExtendCaseAccident) => {
              this.accident = caseAccident.accident;
              this.discountType = caseAccident.discount;
              this.discountValue = this.accident.discount_value;
            })
            .catch(err => {
              this._logger.error(err);
              this.loadingBar.complete();
            });*/
        } else {
          this.isLoaded = true;
        }
      });
  }

  onSave(): void {
    this.msgs = [];
    this.msgs.push({severity: 'error', summary: this.translate.instant('general.not_saved') + '!', detail: 'Save method still has not been implemented!'});
    this._state.notifyDataChanged('growl', this.msgs);
    this.loadingBar.start();
    this.blocked = true;
    setTimeout(() => {
      this.blocked = false;
      this.loadingBar.complete();
      }, 3000)
  }

  onCaseTypeSelected(type): void {
    this.accident.caseable_type = type;
  }

  onAccidentTypeSelected(accidentType: AccidentType): void {
    this.accident.accident_type_id = accidentType.id;
  }

  onAssistantChanged(assistantId): void {
    this.accident.assistant_id = assistantId;
  }

  onAccidentSelected(accident: Accident): void {
    this.accident.parent_id = 0;
    setTimeout(() => this.accident.parent_id = accident.id, 100);
  }

  onParentDeleted(): void {
    this.accident.parent_id = 0;
    this.parentSelector.clear();
  }

  onReferralChanged(event): void {
    this.accident.ref_num = event.target.value;
  }

  onServicesSelectorPriceChanged(servicesPrice: number): void {
    this.totalAmount = +servicesPrice.toFixed(2);
    this.recalculatePrice();
  }

  onDiscountTypeSelected(discountType: Discount): void {
    this.discountType = discountType;
    this.recalculatePrice();
  }

  onDiscountValueChanged(): void {
    this.discountValue = +this.discountValue.toFixed(2);
    this.recalculatePrice();
  }

  private recalculatePrice(): void {
    this.totalIncome = 0;
    if (this.totalAmount && this.discountType && this.discountValue) {
      if (this.discountType.operation === '%') {
        // *
        this.totalIncome = this.totalAmount - this.discountValue * this.totalAmount / 100;
        this.totalIncomeFormula = this.totalAmount + ' - ' + this.discountValue + ' * ' + this.totalAmount + ' / 100';
      } else if (this.discountType.operation === 'EUR') {
        // -
        this.totalIncome = this.totalAmount - this.discountValue;
        this.totalIncomeFormula = this.totalAmount + ' - ' + this.discountValue;
      } else {
        this._logger.warn('Undefined discount type: ' + this.discountType.operation);
        this.totalIncome = this.totalAmount;
        this.totalIncomeFormula = this.translate.instant('general.without_discount');
      }
    } else {
      this.totalIncome = this.totalAmount;
      this.totalIncomeFormula = this.translate.instant('general.without_discount');
    }

    this.totalIncome = +this.totalIncome.toFixed(2);
    this.totalAmount = +this.totalAmount.toFixed(2);
  }

  private loadPatient(): void {
    if (this.accident.patient_id) {
      this.loadingBar.start();
      this.patientService.getPatient(this.accident.patient_id).then((patient: Patient) => {
        this.patient = patient;
        this.phone = this.patient.phones;
        this.loadingBar.complete();
      }).catch((err) => {
        this._logger.error(err);
        this.loadingBar.complete();
      });
    } else {
      this._logger.debug('Accident does not contain patients');
    }
  }

  private loadCaseable(): void {
    let components = 2;
    let complete = () => {
      if (--components <= 0 ) {
        this.loadingBar.complete();
      }
    };

    this.loadingBar.start();
    this.caseService.getDoctorCase(this.accident.id)
      .then((doctorAccident: DoctorAccident) => {
        this.doctorAccident = doctorAccident;
        complete();
      }).catch(err => {
        this._logger.error(err);
        complete();
      });

    /*
    TODO Not Implemented yet, doctor case has priority

    this.caseService.getHospitalCase(this.accident.id)
      .then((hospitalAccident: HospitalAccident) => {
        this.hospitalAccident = hospitalAccident;
        complete();
      }).catch((err) => {
        this._logger.error(err);
        complete();
      });*/
  }
}
