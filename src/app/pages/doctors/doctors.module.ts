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
import { routing } from './doctors.routing';
import { DoctorsComponent } from './doctors.component';
import { DoctorServicesComponent } from './components/services/services.component';
import { StuffComponent } from './components/stuff/stuff.component';
import { DoctorsService } from '../../components/doctors/doctors.service';
import { UserEditorComponent } from '../../components/users/editor/editor.component';
import { UserSelectorComponent } from '../../components/users/selector/selector.component';
import { UsersService } from '../../components/users/users.service';
import { DoctorEditorComponent } from '../../components/doctors/editor/editor.component';
import { ServicesService } from '../../components/service/services.service';
import { DiagnosticsComponent } from './components/diagnostics/diagnostics.component';
import { DiagnosticService } from '../../components/diagnostic/diagnostic.service';
import { DiagnosticCategoryService } from '../../components/diagnostic/category/category.service';
import { AppTranslationModule } from '../../app.translation.module';
import { AutoCompleteModule, ListboxModule } from 'primeng/primeng';
import { CitiesModule } from '../../components/city/cities.module';
import { CitiesService } from '../../components/city/cities.service';
import { SurveysComponent } from './components/surveys/surveys.component';
import { SurveyService } from '../../components/survey/survey.service';
import { DiagnosticEditorModule } from '../../components/diagnostic/components/editor';
import { DiagnosticCategoryEditorModule } from '../../components/diagnostic/category/components/editor';
import { DiagnosticCategorySelectorModule } from '../../components/diagnostic/category/components/selector';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing,
    AppTranslationModule,
    Ng2SmartTableModule,
    AutoCompleteModule,
    ListboxModule,
    CitiesModule,
    DiagnosticEditorModule,
    DiagnosticCategoryEditorModule,
    DiagnosticCategorySelectorModule,
  ],
  declarations: [
    DoctorsComponent,
    StuffComponent,
    DoctorServicesComponent,
    UserEditorComponent,
    UserSelectorComponent,
    DoctorEditorComponent,
    DiagnosticsComponent,
    SurveysComponent,
  ],
  providers: [
    DoctorsService,
    ServicesService,
    UsersService,
    DiagnosticService,
    DiagnosticCategoryService,
    CitiesService,
    SurveyService,
  ],
})

export class DoctorsModule {
}
