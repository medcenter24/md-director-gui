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
import { DiagnosticsService } from './diagnostics.service';

import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';
import { DiagnosticService } from './components/diagnostic/diagnostic.service';

import { CategoriesComponent } from './components/categories';
import { CategorySelectorComponent } from './components/categories/selector.component';
import { CategoryService } from './components/categories/category.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Ng2SmartTableModule,
    ],
    declarations: [
        Diagnostics,
        DiagnosticComponent,
        CategoriesComponent,
        CategorySelectorComponent,
    ],
    providers: [
        DiagnosticsService,
        DiagnosticService,
        CategoryService,
    ]
})

export class DiagnosticsModule {}

