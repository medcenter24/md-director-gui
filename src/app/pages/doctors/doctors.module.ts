/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { routing }       from './doctors.routing';
import { Doctors } from './doctors.component';
import { Services } from './components/services/services.component';
import { Stuff } from './components/stuff/stuff.component';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { DoctorsService } from '../../components/doctors/doctors.service';
import { UserEditorComponent } from '../../components/users/editor/editor.component';
import { UserSelectorComponent } from '../../components/users/selector/selector.component';
import { UsersService } from '../../components/users/users.service';
import { DoctorEditorComponent } from '../../components/doctors/editor/editor.component';
import { ServicesService } from '../../components/service/services.service';
import { Diagnostics } from './components/diagnostics/diagnostics.component';
import { DiagnosticEditorComponent } from '../../components/diagnostic/components/editor/editor.component';
import { DiagnosticCategoryEditorComponent } from '../../components/diagnostic/category/components/editor/editor.component';
import { DiagnosticCategorySelectorComponent } from '../../components/diagnostic/category/components/selector/selector.component';
import { DiagnosticService } from '../../components/diagnostic/diagnostic.service';
import { DiagnosticCategoryService } from '../../components/diagnostic/category/category.service';
import { AppTranslationModule } from '../../app.translation.module';
import { AutoCompleteModule, ListboxModule } from 'primeng/primeng';
import { CitiesModule } from '../../components/city/cities.module';
import { CitiesService } from '../../components/city/cities.service';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from '../../faker/in-memory-data.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    AppTranslationModule,
    Ng2SmartTableModule,
    Ng2Bs3ModalModule,
    AutoCompleteModule,
    ListboxModule,
    CitiesModule,
    // InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/', passThruUnknownUrl: true}),
  ],
  declarations: [
    Doctors,
    Stuff,
    Services,
    UserEditorComponent,
    UserSelectorComponent,
    DoctorEditorComponent,
    Diagnostics,
    DiagnosticEditorComponent,
    DiagnosticCategoryEditorComponent,
    DiagnosticCategorySelectorComponent,
  ],
  providers: [
    DoctorsService,
    ServicesService,
    UsersService,
    DiagnosticService,
    DiagnosticCategoryService,
    CitiesService,
  ],
})

export class DoctorsModule {
}
