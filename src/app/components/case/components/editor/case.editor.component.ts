/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, ViewChild, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Accident } from '../../../accident/accident';
import { AccidentsService } from '../../../accident/accidents.service';
import { Message } from 'primeng/primeng';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { TranslateService } from '@ngx-translate/core';
import { AccidentType } from '../../../accident/components/type/type';
import { Logger } from 'angular2-logger/core';
import { GlobalState } from '../../../../global.state';
import { DoctorAccident } from '../../../doctorAccident/doctorAccident';
import { FormService } from '../../../forms';
import { HospitalAccident } from '../../../hospitalAccident/hospitalAccident';
import { InvoiceEditorComponent } from '../../../invoice/components/editor';
import { Invoice } from '../../../invoice/invoice';
import { Upload } from '../../../upload/upload';
import { CasesService } from '../../cases.service';
import { Diagnostic } from '../../../diagnostic/diagnostic';
import { Document } from '../../../document/document';
import { AccidentCheckpoint } from '../../../accident/components/checkpoint/checkpoint';
import { DoctorsService } from '../../../doctors';
import { Doctor } from '../../../doctors';
import { DateHelper } from '../../../../helpers/date.helper';
import { Survey } from '../../../survey/survey';
import { PatientEditorComponent } from '../../../patient/components/editor/patient.editor.component';
import { LoadingComponent } from '../../../core/components/componentLoader';
import { Patient } from '../../../patient/patient';
import { PatientSelectorComponent } from '../../../patient/components/selector/patient.selector.component';
import { PatientsService } from '../../../patient/patients.service';
import { CaseFinanceComponent } from '../finance';
import { Assistant, AssistantsService } from '../../../assistant';
import { CaseEditorTabsService } from './case.editor.tabs.service';
import { AccidentScenarioLineComponent }
  from '../../../accident/components/scenario/components/line/accident.scenario.line.component';
import { Service } from '../../../service';
import { AutocompleterComponent } from '../../../ui/selector/components/autocompleter';
import { CitiesService } from '../../../city';
import { Hospital, HospitalsService } from '../../../hospital';

@Component({
  selector: 'nga-case-editor',
  templateUrl: './case.editor.html',
  styleUrls: ['./case.editor.scss'],
})
export class CaseEditorComponent extends LoadingComponent implements OnInit {

  @ViewChild('parentSelector')
    private parentSelector: AutocompleterComponent;

  @ViewChild('scenario')
    private scenarioComponent: AccidentScenarioLineComponent;

  @ViewChild('editPatientForm')
    private editPatientForm: PatientEditorComponent;

  @ViewChild('patientSelector')
    private patientSelector: PatientSelectorComponent;

  @ViewChild('previewContainer')
    previewContainer: ElementRef;

  // I need to update finance if data changes
  @ViewChild('caseFinance')
    private caseFinance: CaseFinanceComponent;

  @ViewChild('assistantAutocompleter')
    private assistantAutocompleter: AutocompleterComponent;

  @ViewChild('cityAutocompleter')
    private cityAutocompleter: AutocompleterComponent;

  @ViewChild('doctorAutocompleter')
    private doctorAutocompleter: AutocompleterComponent;

  @ViewChild('hospitalAutocompleter')
    private hospitalAutocompleter: AutocompleterComponent;

  @ViewChild('guaranteeHospitalAutocompleter')
    private guaranteeHospitalAutocompleter: AutocompleterComponent;

  @ViewChild('hospitalInvoiceEditor')
    private hospitalInvoiceEditor: InvoiceEditorComponent;

  msgs: Message[] = [];
  accident: Accident;
  appliedTime: string = '';
  doctorAccident: DoctorAccident;
  hospitalAccident: HospitalAccident;
  services: Service[] = [];
  diagnostics: Diagnostic[] = [];
  surveys: Survey[] = [];
  documents: Document[] = [];
  checkpoints: number[] = []; // ids of checkpoints
  handlingTime: string = '';
  createdTime: string = '';
  updatedTime: string = '';
  deletedTime: string = '';
  closedTime: string = '';
  patientEditFormDisplay: boolean = false;
  patient: Patient;
  reportPreviewVisible: boolean = false;
  assistantInvoice: Invoice;
  assistantGuaranteeFile: Upload;

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
               public accidentsService: AccidentsService,
               private caseService: CasesService,
               public doctorService: DoctorsService,
               private router: Router,
               private dateHelper: DateHelper,
               private patientService: PatientsService,
               private tabStopper: CaseEditorTabsService,
               public assistantService: AssistantsService,
               public cityService: CitiesService,
               public hospitalService: HospitalsService,
               public formService: FormService,
  ) {
    super();
  }

  ngOnInit () {
    this.accident = new Accident();

    this.doctorAccident = new DoctorAccident();
    this.hospitalAccident = new HospitalAccident();

    this.route.params
      .subscribe((params: Params) => {
        this._state.notifyDataChanged('menu.activeLink', { title: 'Cases' });

        if (+params[ 'id' ]) {
          this.startLoader();
          this.accidentsService.getAccident(+params[ 'id' ]).then((accident: Accident) => {
            this.stopLoader();
            this._state.notifyDataChanged('menu.activeLink', { title: 'Cases' });
            this.accident = accident ? accident : new Accident();
            if (this.accident.handlingTime && this.accident.handlingTime.length) {
              this.handlingTime = this.dateHelper.toEuropeFormatWithTime(this.accident.handlingTime);
            }
            if (this.accident.createdAt.length) {
              this.createdTime = this.dateHelper.toEuropeFormatWithTime(this.accident.createdAt);
            }
            if (this.accident.updatedAt && this.accident.updatedAt.length) {
              this.updatedTime = this.dateHelper.toEuropeFormatWithTime(this.accident.updatedAt);
            }
            if (this.accident.deletedAt && this.accident.deletedAt.length) {
              this.deletedTime = this.dateHelper.toEuropeFormatWithTime(this.accident.deletedAt);
            }
            if (this.accident.closedAt && this.accident.closedAt.length) {
              this.closedTime = this.dateHelper.toEuropeFormatWithTime(this.accident.closedAt);
            }
            if (this.accident.assistantId) {
              this.assistantAutocompleter.selectItems(this.accident.assistantId);
            }
            if (this.accident.cityId) {
              this.cityAutocompleter.selectItems(this.accident.cityId);
            }
            // cheating to not make extra request
            if (+this.accident.assistantGuaranteeId) {
              this.assistantGuaranteeFile = new Upload(this.accident.assistantGuaranteeId);
            }
            this.assistantInvoice = new Invoice(accident.assistantInvoiceId, 0, 'form');

            this.loadCaseable();
            this.loadDocuments();
            this.loadCheckpoints();
            this.loadPatient();
          }).catch((err) => {
            this.stopLoader();
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
    this.tabStopper.init();
  }

  onSave(): void {
    this.accident.handlingTime = this.handlingTime && this.handlingTime.length
      ? this.dateHelper.getUnixDateWithTime(this.dateHelper.parseDateFromFormat(this.handlingTime))
      : '';

    this.doctorAccident.visitTime = this.appliedTime && this.appliedTime.length
      ? this.dateHelper.getUnixDateWithTime(this.dateHelper.parseDateFromFormat(this.appliedTime))
      : '';

    const data = {
      accident: this.accident,
      doctorAccident: this.doctorAccident,
      hospitalAccident: this.hospitalAccident,
      services: this.services.map(x => x.id),
      diagnostics: this.diagnostics.map(x => x.id),
      surveys: this.surveys.map(x => x.id),
      documents: this.documents.map(x => x.id),
      checkpoints: this.checkpoints,
      patient: this.patientSelector.getPatient(),
    };

    if (this.doctorBeforeSave && this.doctorBeforeSave !== this.doctorAccident.doctorId) {
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
    const postfix = 'SaveCase';
    this.startLoader(postfix);
    this.caseService.saveCase(data).then(response => {
      this.stopLoader(postfix);
      this.doctorBeforeSave = this.doctorAccident.doctorId;
      this.msgs = [];
      this.msgs.push({ severity: 'success', summary: this.translate.instant('Saved'),
        detail: this.translate.instant('Successfully saved') });
      this._state.notifyDataChanged('growl', this.msgs);
      if (!data.accident.id) {
        this.router.navigate([`pages/cases/${response.accident.id}`]);
      } else {
        this.scenarioComponent.reload();
      }
    }).catch(err => {
      this.stopLoader(postfix);

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
    this.accident.caseableType = type;
    if (type === 'App\\DoctorAccident' && !this.doctorAccident) {
      this.doctorAccident = new DoctorAccident();
    } else if (!this.hospitalAccident) {
      this.hospitalAccident = new HospitalAccident();
    }
  }

  onAccidentTypeSelected(accidentType: AccidentType): void {
    this.accident.accidentTypeId = accidentType.id;
  }

  onAssistantChanged(assistant: Assistant): void {
    this.accident.assistantId = assistant.id;
  }

  onAccidentSelected(accident: Accident): void {
    this.accident.parentId = 0;
    setTimeout(() => this.accident.parentId = accident.id, 100);
  }

  onParentDeleted(): void {
    this.accident.parentId = 0;
    this.parentSelector.selectItems(0);
  }

  onReferralChanged(event): void {
    this.accident.refNum = event.target.value;
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

  onDoctorChanged(doc): void {
    this.doctorAccident.doctorId = doc ? doc.id : 0;
  }

  onHospitalChanged(hospital: Hospital): void {
    this.hospitalAccident.hospitalId = hospital ? hospital.id : 0;
  }

  onCityChanged(city): void {
    const cityId = city ? city.id : 0;
    this.accident.cityId = cityId;

    this.doctorAccident.doctorId = +this.doctorAccident.doctorId;
    // determine which doctor could be used in this hospital
    if (!this.doctorAccident.doctorId && cityId) {
      this.defineDoctorByCity(cityId);
    }
  }

  onCheckpointChange(checkpoints: number[]): void {
    this.checkpoints = checkpoints;
  }

  onServicesSelectorPriceChanged(servicesPrice: number): void {
    console.debug('changed price');
    /*this.totalAmount = +servicesPrice.toFixed(2);
    this.recalculatePrice();*/
  }

  private defineDoctorByCity(cityId: number): void {
    this.loadingBar.start();
    this.doctorService.getDoctorsByCity(cityId).then((doctors: Doctor[]) => {
      if (doctors && doctors.length) {
        this.doctorAccident.doctorId = doctors[0].id;
      }
      this.loadingBar.complete();
    });
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
    if (+this.accident.patientId) {
      this.startLoader('getPatient');
      this.patientService.getPatient(this.accident.patientId)
        .then((patient: Patient) => {
          this.stopLoader('getPatient');
          this.patient = patient;
        })
        .catch(() => this.stopLoader('getPatient'));
    }
  }

  private loadDoctorAccidentCaseable(): void {
    const postfix = '_GetDoctorCaseable';
    this.startLoader(postfix);
    this.caseService.getDoctorCase(this.accident.id)
      .then((doctorAccident: DoctorAccident) => {
        this.doctorAccident = doctorAccident;
        this.doctorBeforeSave = doctorAccident.doctorId;
        if (+this.doctorAccident.doctorId) {
          this.doctorAutocompleter.selectItems(+this.doctorAccident.doctorId);
        }
        if (doctorAccident.visitTime) {
          this.appliedTime = this.dateHelper.toEuropeFormatWithTime(doctorAccident.visitTime);
        }
        this.stopLoader(postfix);
      }).catch(err => {
      this._logger.error(err);
      this.stopLoader(postfix);
    });
  }

  private loadHospitalCaseable (): void {
    const postfix = 'getHospitalCaseable';
    this.startLoader(postfix);
    this.caseService.getHospitalCase(this.accident.id)
      .then((hospitalAccident: HospitalAccident) => {
        this.stopLoader(postfix);

        this.hospitalAccident = hospitalAccident;
        if (hospitalAccident.hospitalId) {
          this.hospitalAutocompleter.selectItems(hospitalAccident.hospitalId);
        }
        // hospital's letter
        if (+this.hospitalAccident.hospitalGuaranteeId) {
          this.guaranteeHospitalAutocompleter.selectItems(this.hospitalAccident.hospitalGuaranteeId);
        }
        // hospital's invoice
        this.hospitalInvoiceEditor.setInvoice(new Invoice(hospitalAccident.hospitalInvoiceId, 0, 'file'), true);
      }).catch((err) => {
        this._logger.error(err);
        this.stopLoader(postfix);
      });
  }

  private loadCaseable(): void {
    if (this.isDoctorAccident()) {
      this.loadDoctorAccidentCaseable();
    } else {
      this.loadHospitalCaseable();
    }
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

  isDoctorAccident(): boolean {
    return this.accident.caseableType === 'App\\DoctorAccident';
  }

  isHospitalAccident(): boolean {
    return this.accident.caseableType === 'App\\HospitalAccident';
  }

  onAssistantGuaranteeFileUploaded(file: Upload): void {
    this.assistantGuaranteeFile = file;
    this.accident.assistantGuaranteeId = file.id;
  }
}
