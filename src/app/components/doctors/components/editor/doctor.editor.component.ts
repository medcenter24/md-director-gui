/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { Doctor } from '../../doctor';
import { DoctorsService } from '../../doctors.service';
import { City } from '../../../city/city';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { UserSelectorComponent } from '../../../users/selector';
import { CitySelectComponent } from '../../../city/components/select';
import { User } from '../../../users/user';

@Component({
  selector: 'nga-doctor-editor',
  templateUrl: './doctor.editor.html',
})
export class DoctorEditorComponent extends LoadableComponent implements AfterViewInit {
  protected componentName: string = 'DoctorEditorComponent';

  @Input() set setDoctor(doctor: Doctor) {
    if (this.doctor !== doctor) {
      this.showUserEditor = false;
    }
    this.doctor = doctor;
    this.loadEditableData();
  }

  @Output() doctorChanged: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('userSelector')
    private userSelectorComponent: UserSelectorComponent;

  @ViewChild('selectCity')
    private selectCityComponent: CitySelectComponent;

  doctor: Doctor;
  showUserEditor: boolean = false;
  cities: City[] = [];
  isLoaded: boolean = false;

  constructor(
    private service: DoctorsService,
  ) {
    super();
  }

  ngAfterViewInit(): void {
    this.isLoaded = true;
    this.loadEditableData();
  }

  onSubmit(): void {
    const opName = `${this.componentName}Save`;
    this.startLoader(opName);
    if (this.doctor.id) {
      this.service.update(this.doctor).then((doctor: Doctor) => {
        this.stopLoader(opName);
        this.doctorChanged.emit(doctor);
      }).catch(() => this.stopLoader(opName));
    } else {
      this.service.create(this.doctor).then((doctor: Doctor) => {
        this.stopLoader(opName);
        this.doctorChanged.emit(doctor);
      }).catch(() => this.stopLoader(opName));
    }
  }

  onSelectorLoading(): void {
    this.startLoader('Selector');
  }

  onSelectorLoaded(): void {
    this.stopLoader('Selector');
  }

  onUserChanged(user: User): void {
    this.doctor.userId = user.id;
  }

  onCitySelect(cities: City[]): void {
    const opName = 'CitySelect';
    this.startLoader(opName);
    this.service.setDoctorCities(this.doctor.id, cities)
      .then(() => this.stopLoader(opName))
      .catch(() => this.stopLoader(opName));
  }

  toggleEditor(): void {
    this.showUserEditor = !this.showUserEditor;
  }

  closeEditor(): void {
    this.close.emit(true);
  }

  reloadUsers(): void {
    // todo this.userSelectorComponent.reloadWithUserId(+this.doctor.userId);
  }

  loadDoctorById(id: number): void {
    if (id) {
      const opName = 'Doctor';
      this.startLoader(opName);
      this.service.getDoctor(id)
        .then((doctor: Doctor) => {
          this.stopLoader(opName);
          this.doctor = doctor;
          this.loadEditableData();
        }).catch(() => this.stopLoader(opName));
    }
  }

  loadEditableData(): void {
    if (this.isLoaded) {
      this.reloadUsers();
      this.reloadDoctorCities();
    }
  }

  private reloadDoctorCities(): void {
    this.cities = [];
    if (this.doctor && this.doctor.id) {
      const opName = 'LoadCity';
      this.startLoader(opName);
      this.service.getDoctorCities(this.doctor.id)
        .then((cities: City[]) => {
          this.stopLoader(opName);
          this.cities = cities;
          // this.selectCityComponent.selectPreloadedCities(this.cities);
        }).catch(() => this.stopLoader(opName));
    }
  }

  handleUserEdited(event): void {
    console.log('user edited', event);
  }
}
