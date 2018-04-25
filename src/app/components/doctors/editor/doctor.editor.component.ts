/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Doctor } from '../doctor';
import { DoctorsService } from '../doctors.service';
import { City } from '../../city/city';
import { LoadableComponent } from '../../core/components/componentLoader/LoadableComponent';
import { UserSelectorComponent } from '../../users/selector';

@Component({
  selector: 'nga-doctor-editor',
  templateUrl: './doctor.editor.html',
})
export class DoctorEditorComponent extends LoadableComponent implements OnChanges {
  protected componentName: string = 'DoctorEditorComponent';

  @Input() doctor: Doctor = new Doctor();

  @Output() doctorChanged: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  @ViewChild(UserSelectorComponent)
    private userSelectorComponent: UserSelectorComponent;

  showUserEditor: boolean = false;
  cities: number[] = [];

  constructor(
    private service: DoctorsService,
  ) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.doctor.previousValue !== changes.doctor.currentValue) {
      this.showUserEditor = false;
    }
  }

  onSubmit(): void {
    const opName = `${this.componentName}Save`;
    this.onInit(opName);
    if (this.doctor.id) {
      this.service.update(this.doctor).then((doctor: Doctor) => {
        this.onLoaded(opName);
        this.doctorChanged.emit(doctor);
      }).catch(() => {
        this.onLoaded(opName);
      });
    } else {
      this.service.create(this.doctor).then((doctor: Doctor) => {
        this.onLoaded(opName);
        this.doctorChanged.emit(doctor);
      }).catch(() => {
        this.onLoaded(opName);
      });
    }
  }

  onSelectorLoading(): void {
    this.onInit(`${this.componentName}Selector`);
  }

  onSelectorLoaded(): void {
    this.onLoaded(`${this.componentName}Selector`);
  }

  onUserChanged(userId: number): void {
    this.doctor.userId = userId;
  }

  onCitySelect(cities): void {
    const opName = `${this.componentName}CitySelect`;
    this.onInit(opName);
    this.service.setDoctorCities(this.doctor.id, cities)
      .then(() => this.onLoaded(opName))
      .catch(() => this.onLoaded(opName));
  }

  toggleEditor(userId: number): void {
    this.showUserEditor = !this.showUserEditor;
    console.log(userId);
  }

  closeEditor(): void {
    this.close.emit(true);
  }

  reloadUsers(): void {
    this.userSelectorComponent.reloadWithUserId(this.doctor.userId);
  }

  loadDoctorById(id: number): void {
    if (id) {
      const opName = `${this.componentName}Doctor`;
      this.onInit(opName);
      this.service.getDoctor(id)
        .then((doctor: Doctor) => {
          this.onLoaded(opName);
          this.doctor = doctor;
          this.reloadUsers();
          this.reloadDoctorCities();
        }).catch(() => this.onLoaded(opName));
    }
  }

  private reloadDoctorCities(): void {
    const opName = `${this.componentName}LoadCity`;
    this.onInit(opName);
    this.service.getDoctorCities(this.doctor.id)
      .then((cities: City[]) => {
        this.onLoaded(opName);
        this.cities = cities.map(x => x.id);
      }).catch(() => this.onLoaded(opName));
  }
}
