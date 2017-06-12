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
import { Service } from '../../../service/service';
import { Diagnostic } from '../../../diagnostic/diagnostic';
import { UploadFile } from '../../../upload/uploadFile';

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
  waitLoading: number = 0;

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
  services: Service[] = [];
  diagnostics: Diagnostic[] = [];
  uploads: UploadFile[] = [];

  totalAmount: number = 0;
  totalIncome: number = 0;

  totalIncomeFormula: string = '';

  constructor (private route: ActivatedRoute,
               private loadingBar: SlimLoadingBarService, private translate: TranslateService,
               private _logger: Logger, private _state: GlobalState,
               private patientService: PatientsService,
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
          this.startLoader();
          this.accidentsService.getAccident(+params[ 'id' ]).then((accident: Accident) => {
            this._state.notifyDataChanged('menu.activeLink', {title: 'general.menu.cases'});
            this.accident = accident ? accident : new Accident();
            this.appliedTime = new Date(this.accident.created_at);
            this.discountValue = 0; // +this.accident.discount_value;
            this.loadPatient();
            this.loadCaseable();
            this.recalculatePrice();
            this.loadUploads();
            this.stopLoader();
          }).catch((err) => {
            this.loadingBar.complete();
            if (err.status === 404) {
              this.msgs = [];
              this.msgs.push({severity: 'error', summary: this.translate.instant('general.error'), detail: '404 Not Found'});
              this._state.notifyDataChanged('growl', this.msgs);
              this.router.navigate([ 'pages/cases' ]);
            } else {
              this._logger.error(err);
            }
          });
        } else {
          this.isLoaded = true;
        }
      });
  }

  startLoader(): void {
    this.waitLoading++;
    if (!this.blocked) {
      this.isLoaded = false;
      this.blocked = true;
      this.loadingBar.start();
    }
  }

  stopLoader(): void {
    if (--this.waitLoading <= 0) {
      this.isLoaded = true;
      this.blocked = false;
      this.loadingBar.complete();
    }
  }

  onSave(): void {
    let data = {
      accident: this.accident,
      doctorAccident: this.doctorAccident,
      patient: this.patient,
      discount: {
        type: this.discountType,
        value: this.discountValue
      },
      services: this.services,
      diagnostics: this.diagnostics,
      uploads: this.uploads
    };

    this.msgs = [];
    this.msgs.push({severity: 'error', summary: this.translate.instant('general.not_saved') + '!', detail: 'Save method still has not been implemented!'});
    this._state.notifyDataChanged('growl', this.msgs);

    this.loadingBar.start();0
    this.blocked = true;

    this.caseService.saveCase(data).then((accident: Accident) => {

      // todo saved
      // if response 204 - created - move to the new case
      // else do nothing (show status - done)


      this.loadingBar.complete();
      this.blocked = false;

      this.isLoaded = true;
    }).catch((err) => {
      this.loadingBar.complete();
      this.blocked = false;

      if (err.status === 404) {
        this.msgs = [];
        this.msgs.push({severity: 'error', summary: this.translate.instant('general.error'), detail: '404 Not Found'});
        this._state.notifyDataChanged('growl', this.msgs);
        this.router.navigate([ 'pages/cases' ]);
      } else {
        this._logger.error(err);
      }
    });

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

  onServicesChanged(services: Service[]): void {
    this.services = services;
  }

  onDiagnosticsChanged(diagnostics: Diagnostic[]): void {
    this.diagnostics = diagnostics;
  }

  onDiscountTypeSelected(discountType: Discount): void {
    this.discountType = discountType;
    this.recalculatePrice();
  }

  onDiscountValueChanged(): void {
    this.discountValue = +this.discountValue.toFixed(2);
    this.recalculatePrice();
  }

  onDoctorChanged(doc): void {
    this.doctorAccident.doctor_id = doc ? doc.id : 0;
  }

  onCityChanged(city): void {
    let cityId = city ? city.id : 0;
    this.doctorAccident.city_id = cityId;
    this.accident.city_id = cityId;
  }

  onUploadsChanged(uploads: UploadFile[]): void {
    this.uploads = uploads;
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
      this.startLoader();
      this.patientService.getPatient(this.accident.patient_id).then((patient: Patient) => {
        this.patient = patient;
        this.phone = this.patient.phones;
        this.stopLoader();
      }).catch((err) => {
        this._logger.error(err);
        this.stopLoader();
      });
    } else {
      this._logger.debug('Accident does not contain patients');
    }
  }

  private loadUploads(): void {
    this.startLoader();
    this.caseService.getUploads(this.accident.id)
      .then((uploads: UploadFile[]) => {
        this.uploads = uploads;
        this.stopLoader();
      }).catch(err => {
        this._logger.error(err);
        this.stopLoader();
      });
  }

  private loadCaseable(): void {
    this.startLoader();
    this.caseService.getDoctorCase(this.accident.id)
      .then((doctorAccident: DoctorAccident) => {
        this.doctorAccident = doctorAccident;
        this.stopLoader();
      }).catch(err => {
        this._logger.error(err);
        this.stopLoader();
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
