/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { DoctorDatatableModule } from '../../components/doctors/components/datatable';
import { DoctorsComponent } from './doctors.component';
import { routing } from './doctors.routing';

@NgModule({
  imports: [
    routing,
    DoctorDatatableModule,
  ],
  declarations: [
    DoctorsComponent,
  ],
  providers: [
    DoctorsComponent,
  ],
})

export class DoctorsModule {
}
