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

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import {Diagnostics} from "./diagnostics.component";
import {DiagnosticEditorComponent} from "../../../../components/diagnostic/editor/editor.component";
import {DiagnosticCategoryEditorComponent} from "../../../../components/diagnostic/category/editor/editor.component";
import {DiagnosticCategorySelectorComponent} from "../../../../components/diagnostic/category/selector/selector.component";
import {DiagnosticService} from "../../../../components/diagnostic/diagnostic.service";
import {DiagnosticCategoryService} from "../../../../components/diagnostic/category/category.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        Ng2SmartTableModule,
        SlimLoadingBarModule.forRoot(),
        Ng2Bs3ModalModule
    ],
    declarations: [
        Diagnostics,
        DiagnosticEditorComponent,
        DiagnosticCategoryEditorComponent,
        DiagnosticCategorySelectorComponent,
    ],
    providers: [
        DiagnosticService,
        DiagnosticCategoryService,
    ]
})

export class DiagnosticsModule {}

