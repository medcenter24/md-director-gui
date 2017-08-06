/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
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
import { Document } from '../../../document/document';
import { AccidentCheckpoint } from '../../../accident/components/checkpoint/checkpoint';
import { DoctorsService } from '../../../doctors/doctors.service';
import { Doctor } from '../../../doctors/doctor';

@Component({
  selector: 'nga-case-editor',
  templateUrl: './editor.html',
})
export class CaseEditorComponent implements OnInit {

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
  documents: Document[] = [];
  checkpoints: Array<number> = []; // ids of checkpoints

  totalAmount: number = 0;
  totalIncome: number = 0;

  totalIncomeFormula: string = '';
  // for a while until the hospital cases implementation
  onlyDoctorAccident: boolean = true;

  /**
   * to show on save message, that doctor was changed
   */
  doctorBeforeSave: number = 0;

  constructor (private route: ActivatedRoute,
               private loadingBar: SlimLoadingBarService,
               private translate: TranslateService,
               private _logger: Logger,
               private _state: GlobalState,
               private patientService: PatientsService,
               private accidentsService: AccidentsService,
               private caseService: CasesService,
               private doctorService: DoctorsService,
               private router: Router,
  ) { }

  ngOnInit () {
    this.translate.get('Without discount').subscribe(res => {
      this.totalIncomeFormula = res;
    });
    this.maxDate = new Date();
    this.appliedTime = new Date();
    this.accident = new Accident();
    this.discountType = new Discount();

    // while configured only doctorAccidents
    // I need to define accident as a doctor
    this.doctorAccident = new DoctorAccident();
    this.accident.caseable_type = 'App\\DoctorAccident';

    this.patient = new Patient();

    this.route.params
      .subscribe((params: Params) => {
        this._state.notifyDataChanged('menu.activeLink', { title: 'Cases' });

        if (+params[ 'id' ]) {
          this.startLoader();
          this.accidentsService.getAccident(+params[ 'id' ]).then((accident: Accident) => {
            this._state.notifyDataChanged('menu.activeLink', { title: 'Cases' });
            this.accident = accident ? accident : new Accident();
            this.appliedTime = new Date(this.accident.created_at);
            this.discountValue = +this.accident.discount_value;
            this.loadPatient();
            this.loadCaseable();
            this.recalculatePrice();
            this.loadDocuments();
            this.loadCheckpoints();
            this.stopLoader();
            this.blocked = false;
          }).catch((err) => {
            this.loadingBar.complete();
            if (err.status === 404) {
              this.msgs = [];
              this.msgs.push({ severity: 'error', summary: this.translate.instant('Error'),
                detail: '404 Not Found' });
              this._state.notifyDataChanged('growl', this.msgs);
              this.router.navigate(['pages/cases']);
            } else {
              this.blocked = false;
              this._logger.error(err);
            }
          });
        } else {
          setTimeout(() => {
            this._state.notifyDataChanged('menu.activeLink', { title: 'Cases' });
          }, 100);
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
    this.accident.discount_id = this.discountType.id;
    this.accident.discount_value = +this.discountValue;
    const data = {
      accident: this.accident,
      doctorAccident: this.doctorAccident,
      patient: this.patient,
      services: this.services.map(x => x.id),
      diagnostics: this.diagnostics.map(x => x.id),
      documents: this.documents.map(x => x.id),
      checkpoints: this.checkpoints,
    };

    if (this.doctorBeforeSave != this.doctorAccident.doctor_id) {
      this._state.notifyDataChanged('confirmDialog',
        {
          header: this.translate.instant('Warning'),
          message: this.translate.instant('Are you sure that you want to change doctor?' +
            ' Doctor will lost access to that case.'),
          accept: () => { this.saveCase(data); },
          icon: 'fa fa-question-circle',
        },
      );
    } else {
      this.saveCase(data);
    }

  }

  private saveCase(data): void {
    this.loadingBar.start();
    this.blocked = true;

    this.caseService.saveCase(data).then(response => {
      this.loadingBar.complete();
      this.blocked = false;
      this.isLoaded = true;

      this.doctorBeforeSave = this.doctorAccident.doctor_id;
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: this.translate.instant('Saved'),
        detail: this.translate.instant('Successfully saved') });
      this._state.notifyDataChanged('growl', this.msgs);

      if (response.status === 201) {
        this.router.navigate(['pages/cases/' + response.json().accident.id]);
      }
    }).catch(err => {
      this.loadingBar.complete();
      this.blocked = false;

      if (err.status === 404) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: this.translate.instant('Error'),
          detail: this.translate.instant('404 Not Found') });
        this._state.notifyDataChanged('growl', this.msgs);
        this.router.navigate(['pages/cases']);
      } else {
        this._logger.error(err);
      }
    });

  }

  onCaseTypeSelected(type): void {
    this.accident.caseable_type = type;
    if (type === 'App\\DoctorAccident' && !this.doctorAccident) {
      this.doctorAccident = new DoctorAccident();
    }
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
    const cityId = city ? city.id : 0;
    this.doctorAccident.city_id = cityId;
    this.accident.city_id = cityId;

    this.doctorAccident.doctor_id = +this.doctorAccident.doctor_id;
    // determine which doctor could be used in this city
    if (!this.doctorAccident.doctor_id && cityId) {
      this.defineDoctorByCity(cityId);
    }
  }

  onCheckpointChange(checkpoints: number[]): void {
    this.checkpoints = checkpoints;
  }

  private defineDoctorByCity(cityId: number): void {
    this.loadingBar.start();
    this.doctorService.getDoctorsByCity(cityId).then((doctors: Doctor[]) => {
      if (doctors && doctors.length) {
        this.doctorAccident.doctor_id = doctors[0].id;
      }
      this.loadingBar.complete();
    });
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
        this.totalIncomeFormula = this.translate.instant('Without discount');
      }
    } else {
      this.totalIncome = this.totalAmount;
      this.totalIncomeFormula = this.translate.instant('Without discount');
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
    }
  }

  private loadDocuments(): void {
    this.startLoader();
    this.caseService.getDocuments(this.accident.id)
      .then((documents: Document[]) => {
        this.documents = documents;
        this.stopLoader();
      }).catch(err => {
        this._logger.error(err);
        this.stopLoader();
      });
  }

  private loadCheckpoints(): void {
    this.startLoader();
    this.caseService.getCheckpoints(this.accident.id)
      .then((checkpoints: AccidentCheckpoint[]) => {
        this.checkpoints = checkpoints.map(x => x.id);
        this.stopLoader();
      }).catch(() => {
        this.stopLoader();
      });
  }

  private loadCaseable(): void {
    this.startLoader();
    this.caseService.getDoctorCase(this.accident.id)
      .then((doctorAccident: DoctorAccident) => {
        this.doctorAccident = doctorAccident;
        this.doctorBeforeSave = doctorAccident.doctor_id;
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
