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
import { City, CitiesService } from '../../../city';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { UserSelectComponent } from '../../../users/select';
import { User } from '../../../users/user';
import { UserEditorComponent } from '../../../users/editor/user.editor.component';
import { MultiSelectorComponent } from '../../../ui/selector/components/multiSelector';

@Component({
  selector: 'nga-doctor-editor',
  templateUrl: './doctor.editor.html',
})
export class DoctorEditorComponent extends LoadableComponent implements AfterViewInit {
  protected componentName: string = 'DoctorEditorComponent';

  @Input() set setDoctor(doctor: Doctor) {
    this.editDoctor(doctor);
  }

  @Output() doctorChanged: EventEmitter<Doctor> = new EventEmitter<Doctor>();
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  @ViewChild('userSelect')
    private userSelectComponent: UserSelectComponent;

  @ViewChild('userEditor')
    private userEditor: UserEditorComponent;

  @ViewChild('citiesSelector')
    private citiesSelector: MultiSelectorComponent;

  doctor: Doctor;
  showUserEditor: boolean = false;
  // doctor's cities
  cities: City[] = [];
  isLoaded: boolean = false;

  constructor(
    private service: DoctorsService,
    public cityService: CitiesService,
  ) {
    super();
  }

  editDoctor(doctor: Doctor): void {
    if (this.doctor !== doctor) {
      this.showUserEditor = false;
    }
    this.doctor = doctor;
    this.loadEditableData();
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
    this.userEditor.loadUser(this.doctor.userId);
  }

  closeEditor(): void {
    this.close.emit(true);
  }

  reloadUsers(): void {
    if (this.doctor) {
      this.userSelectComponent.setUserById(this.doctor.userId);
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
          this.citiesSelector.selectItems(this.cities);
        }).catch(() => this.stopLoader(opName));
    }
  }

  handleUserEdited(event): void {
    this.showUserEditor = false;
    this.doctor.userId = event.id;
    this.reloadUsers();
  }
}
