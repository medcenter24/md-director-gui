/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Accident } from '../../../accident/accident';
import { AccidentsService } from '../../../accident/accidents.service';
import { Message, ToggleButton } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { AccidentType } from '../../../accident/components/type/type';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../global.state';
import { SelectAccidentComponent } from '../../../accident/components/select/select.component';
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
import { AccidentScenarioComponent } from '../../../accident/components/scenario/components/line/line.component';
import { DateHelper } from '../../../../helpers/date.helper';
import { Survey } from '../../../survey/survey';
import { PatientEditorComponent } from '../../../patient/components/editor/editor.component';
import { LoadingComponent } from '../../../core/components/componentLoader/LoadingComponent';
import { Patient } from '../../../patient/patient';
import { PatientSelectorComponent } from '../../../patient/components/selector/selector.component';
import { PatientsService } from '../../../patient/patients.service';

@Component({
  selector: 'nga-case-editor',
  templateUrl: './editor.html',
  styleUrls: ['./editor.scss'],
})
export class CaseEditorComponent extends LoadingComponent implements OnInit {

  @ViewChild('parentSelector')
    private parentSelector: SelectAccidentComponent;

  @ViewChild('scenario')
    private scenarioComponent: AccidentScenarioComponent;

  @ViewChild('incomeAutoupdate')
    private incomeAutoupdate: ToggleButton;

  @ViewChild('editPatientForm')
    private editPatientForm: PatientEditorComponent;

  @ViewChild('patientSelector')
    private patientSelector: PatientSelectorComponent;

  @ViewChild('previewContainer')
    previewContainer: ElementRef;

  msgs: Message[] = [];
  accident: Accident;
  appliedTime: string = '';
  discountValue: number = 0;
  discountType: Discount;
  doctorAccident: DoctorAccident;
  hospitalAccident: HospitalAccident;
  services: Service[] = [];
  diagnostics: Diagnostic[] = [];
  surveys: Survey[] = [];
  documents: Document[] = [];
  checkpoints: number[] = []; // ids of checkpoints
  totalAmount: number = 0;
  totalIncome: number = 0;
  handlingTime: string = '';
  createdTime: string = '';
  updatedTime: string = '';
  deletedTime: string = '';
  closedTime: string = '';
  totalIncomeFormula: string = '';
  // for a while until the hospital cases implementation
  onlyDoctorAccident: boolean = true;
  patientEditFormDisplay: boolean = false;
  patient: Patient;
  reportPreviewVisible: boolean = false;
  reportPreviewHtml: string = '';

  /**
   * to show on save message, that doctor was changed
   */
  doctorBeforeSave: number = 0;

  protected componentName: string = 'CaseEditorComponent';

  constructor (private route: ActivatedRoute,
               protected loadingBar: SlimLoadingBarService,
               private translate: TranslateService,
               protected _logger: Logger,
               protected _state: GlobalState,
               private accidentsService: AccidentsService,
               private caseService: CasesService,
               private doctorService: DoctorsService,
               private router: Router,
               private dateHelper: DateHelper,
               private patientService: PatientsService,
  ) {
    super();
  }

  ngOnInit () {
    this.translate.get('Without discount').subscribe(res => {
      this.totalIncomeFormula = res;
    });
    this.accident = new Accident();
    this.discountType = new Discount();

    // while configured only doctorAccidents
    // I need to define accident as a doctor
    this.doctorAccident = new DoctorAccident();
    this.accident.caseable_type = 'App\\DoctorAccident';

    // we need it because of redirect after case creation
    this._state.notifyDataChanged('blocker', false);

    this.route.params
      .subscribe((params: Params) => {
        this._state.notifyDataChanged('menu.activeLink', { title: 'Cases' });

        if (+params[ 'id' ]) {
          this.startLoader(this.componentName);
          this.accidentsService.getAccident(+params[ 'id' ]).then((accident: Accident) => {
            this.stopLoader(this.componentName);
            this._state.notifyDataChanged('menu.activeLink', { title: 'Cases' });
            this.accident = accident ? accident : new Accident();
            this.discountValue = +this.accident.discount_value;
            if (this.accident.handling_time && this.accident.handling_time.length) {
              this.handlingTime = this.dateHelper.toEuropeFormatWithTime(this.accident.handling_time);
            }
            if (this.accident.created_at.length) {
              this.createdTime = this.dateHelper.toEuropeFormatWithTime(this.accident.created_at);
            }
            if (this.accident.updated_at && this.accident.updated_at.length) {
              this.updatedTime = this.dateHelper.toEuropeFormatWithTime(this.accident.updated_at);
            }
            if (this.accident.deleted_at && this.accident.deleted_at.length) {
              this.deletedTime = this.dateHelper.toEuropeFormatWithTime(this.accident.deleted_at);
            }
            if (this.accident.closed_at && this.accident.closed_at.length) {
              this.closedTime = this.dateHelper.toEuropeFormatWithTime(this.accident.closed_at);
            }
            this.loadCaseable();
            this.recalculatePrice();
            this.loadDocuments();
            this.loadCheckpoints();
            this.loadPatient();
          }).catch((err) => {
            this.stopLoader(this.componentName);
            if (err.status === 404) {
              this.msgs = [];
              this.msgs.push({ severity: 'error', summary: this.translate.instant('Error'),
                detail: '404 Not Found' });
              this._state.notifyDataChanged('growl', this.msgs);
              this.router.navigate(['pages/cases']);
            } else {
              this._logger.error(err);
            }
          });
        } else {
          setTimeout(() => {
            this._state.notifyDataChanged('menu.activeLink', { title: 'Cases' });
          }, 100);
        }
      });
  }

  protected onComponentsLoadingCompleted(): void {
      if (this.accident.id) {
          this.setFixedIncome(this.isIncomeFixed());
          this.totalIncome = this.accident.income;
          this.recalculatePrice();
      }
  }

  onSave(): void {
    this.accident.discount_id = this.discountType.id;
    this.accident.discount_value = +this.discountValue;
    this.accident.handling_time = this.handlingTime && this.handlingTime.length
      ? this.dateHelper.getUnixDateWithTime(this.dateHelper.parseDateFromFormat(this.handlingTime))
      : '';

    this.doctorAccident.visit_time = this.appliedTime && this.appliedTime.length
      ? this.dateHelper.getUnixDateWithTime(this.dateHelper.parseDateFromFormat(this.appliedTime))
      : '';

    this.accident.income = this.totalIncome;
    const data = {
      accident: this.accident,
      doctorAccident: this.doctorAccident,
      services: this.services.map(x => x.id),
      diagnostics: this.diagnostics.map(x => x.id),
      surveys: this.surveys.map(x => x.id),
      documents: this.documents.map(x => x.id),
      checkpoints: this.checkpoints,
      patient: this.patientSelector.getPatient(),
    };

    if (this.doctorBeforeSave && this.doctorBeforeSave !== this.doctorAccident.doctor_id) {
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

  onClose(): void {
    this._state.notifyDataChanged('confirmDialog',
      {
        header: this.translate.instant('Warning'),
        message: this.translate.instant('Are you sure that you want to close case?' +
          ' Every one will lost access to this case.'),
        accept: () => {
          this.caseService.closeCase(this.accident.id).then(() => {
            this.msgs = [];
            this.msgs.push({ severity: 'success', summary: this.translate.instant('Success'),
              detail: 'Case closed.' });
            this._state.notifyDataChanged('growl', this.msgs);
            this.scenarioComponent.reload();
          }).catch(err => {
            this.stopLoader('deleteCase');

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
        },
        icon: 'fa fa-warning',
      },
    );
  }

  onDelete(): void {
    this._state.notifyDataChanged('confirmDialog',
      {
        header: this.translate.instant('Warning'),
        message: this.translate.instant('Are you sure that you want to DELETE case?' +
          ' After that this case won\'t be restored.'),
        accept: () => {
          this.startLoader('deleteCase');
          this.caseService.deleteCase(this.accident.id).then(() => {
            this.stopLoader('deleteCase');
            this.router.navigate(['pages/cases/']);
          }).catch(err => {
            this.stopLoader('deleteCase');

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
        },
        icon: 'fa fa-window-close-o red',
      },
    );
  }

  private saveCase(data): void {
    this.startLoader('saveCase');
    this.caseService.saveCase(data).then(response => {
      this.stopLoader('saveCase');
      this.doctorBeforeSave = this.doctorAccident.doctor_id;
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: this.translate.instant('Saved'),
        detail: this.translate.instant('Successfully saved') });
      this._state.notifyDataChanged('growl', this.msgs);

      if (response.status === 201) {
        this.router.navigate([`pages/cases/${response.json().accident.id}`]);
      } else {
        this.scenarioComponent.reload();
      }
    }).catch(err => {
      this.stopLoader('saveCase');

      if (err.status === 404) {
        this.msgs = [];
        this.msgs.push({ severity: 'error', summary: this.translate.instant('Error'),
          detail: this.translate.instant('404 Not Found') });
        this._state.notifyDataChanged('growl', this.msgs);
        this.router.navigate(['pages/cases']);
      } else if (err.status === 403) {
        this.msgs = [];
        this.msgs.push({
          severity: 'error', summary: this.translate.instant('Error'),
          detail: this.translate.instant('This case was closed'),
        });
        this._state.notifyDataChanged('growl', this.msgs);
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

  onIncomeAutoupdateChanged(event): void {
    this.setFixedIncome(!event.checked);
    this.recalculatePrice();
  }

  onDoctorFeeChanged(event): void {
    this.accident.caseable_cost = this.getFixedFloat(event.target.value);
    this.recalculatePrice();
  }

  onTotalIncomeChanged(event): void {
    this.totalIncome = this.getFixedFloat(event.target.value);
    this.setFixedIncome(true);
    this.recalculatePrice();
  }

  private getFixedFloat(num): number {
    num = num ? num.replace( /^\D+/g, '') : 0;
    if (!num) {
      num = 0;
    } else {
      num = parseFloat(num.replace(',', '.'));
    }
    return Number(num) === num && num % 1 !== 0 ? num.toFixed(2) : num;
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

  onSurveysChanged(surveys: Survey[]): void {
    this.surveys = surveys;
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

  private setFixedIncome(val: boolean): void {
    this.accident.fixed_income = val ? 1 : 0;
    this.incomeAutoupdate.checked = !val;
  }

  private isIncomeFixed(): boolean {
    return +this.accident.fixed_income !== 0;
  }

  private recalculatePrice(): void {
    // do nothing if everything is fixed
    if (this.isIncomeFixed()) {
      this.totalIncomeFormula = this.translate.instant('Income is fixed allowed changes by hand');
      return;
    }

    this.totalIncome = 0;
    if (this.totalAmount && this.discountType && this.discountValue) {
      if (this.discountType.operation === '%') {
        // *
        this.totalIncome = this.totalAmount - this.discountValue * this.totalAmount / 100 - this.accident.caseable_cost;
        this.totalIncomeFormula = `${this.totalAmount} - ${this.discountValue} * ${this.totalAmount}
          / 100 - ${this.accident.caseable_cost}`;
      } else if (this.discountType.operation === 'EUR') {
        // -
        this.totalIncome = this.totalAmount - this.discountValue - this.accident.caseable_cost;
        this.totalIncomeFormula = `${this.totalAmount} - ${this.discountValue} - ${this.accident.caseable_cost}`;
      } else {
        this._logger.warn(`Undefined discount type: ${this.discountType.operation}`);
        this.totalIncome = this.totalAmount;
        this.totalIncomeFormula = this.translate.instant('Without discount');
      }
    } else {
      this.totalIncome = this.totalAmount - this.accident.caseable_cost;
      this.totalIncomeFormula = `this.totalAmount - ${this.accident.caseable_cost}`;
    }

    this.totalIncome = +this.totalIncome.toFixed(2);
    this.totalAmount = +this.totalAmount.toFixed(2);
  }

  private loadDocuments(): void {
    this.startLoader('getDocuments');
    this.caseService.getDocuments(this.accident.id)
      .then((documents: Document[]) => {
        this.documents = documents;
        this.stopLoader('getDocuments');
      }).catch(err => {
        this._logger.error(err);
        this.stopLoader('getDocuments');
      });
  }

  private loadCheckpoints(): void {
    this.startLoader('getCheckpoints');
    this.caseService.getCheckpoints(this.accident.id)
      .then((checkpoints: AccidentCheckpoint[]) => {
        this.checkpoints = checkpoints.map(x => x.id);
        this.stopLoader('getCheckpoints');
      }).catch(() => {
        this.stopLoader('getCheckpoints');
      });
  }

  private loadPatient(): void {
    this.startLoader('getPatient');
    this.patientService.getPatient(this.accident.patient_id)
        .then((patient: Patient) => {
          this.patient = patient;
          this.stopLoader('getPatient');
        })
        .catch(() => this.stopLoader('getPatient'));
  }

  private loadCaseable(): void {
    this.startLoader('getDoctorCase');
    this.caseService.getDoctorCase(this.accident.id)
      .then((doctorAccident: DoctorAccident) => {
        this.doctorAccident = doctorAccident;
        this.doctorBeforeSave = doctorAccident.doctor_id;
        if (doctorAccident.visit_time) {
          this.appliedTime = this.dateHelper.toEuropeFormatWithTime(doctorAccident.visit_time);
        }
        this.stopLoader('getDoctorCase');
      }).catch(err => {
        this._logger.error(err);
        this.stopLoader('getDoctorCase');
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

  openEditPatientForm (patient: Patient): void {
    this.editPatientForm.setPatient(patient);
    this.patientEditFormDisplay = true;
  }

  onPatientSelected(patient: Patient): void {
    this.patient = patient;
    this.editPatientForm.setPatient(patient);
    this.patientSelector.resetPatient(patient);
  }

  downloadPdfReport(): void {
      this.caseService.downloadPdfReport(this.accident.id);
  }

  printReport(): void {
    this.loadingBar.start();
    this.caseService.getReportHtml(this.accident.id)
        .then(html => {
          this.loadingBar.complete();
          const newWin = window.frames['printf'];
          newWin.document.write(`<body onload="window.print()">${html}</body>`);
          newWin.document.close();
        })
        .catch(() => this.loadingBar.complete());
  }

  previewReport(): void {
    this.caseService.getReportHtml(this.accident.id)
        .then((html: string) => {
            this.reportPreviewVisible = true;
            this.previewContainer.nativeElement.innerHTML = html;
        }).catch();
  }
}
