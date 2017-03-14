/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { NgModule }      from '@angular/core';

import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../../../theme/nga.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { Diagnostics } from './diagnostics.component';

import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';
import { DiagnosticService } from './components/diagnostic/diagnostic.service';

import { CategoriesComponent } from './components/categories';
import { CategorySelectorComponent } from './components/categories/selector.component';
import { CategoryService } from './components/categories/category.service';

// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './faker/in-memory-data.service';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Ng2SmartTableModule,
        // InMemoryWebApiModule.forRoot(InMemoryDataService, {apiBase: 'director/'}),
        SlimLoadingBarModule.forRoot(),
        Ng2Bs3ModalModule
    ],
    declarations: [
        Diagnostics,
        DiagnosticComponent,
        CategoriesComponent,
        CategorySelectorComponent,
    ],
    providers: [
        DiagnosticService,
        CategoryService,
    ]
})

export class DiagnosticsModule {}

