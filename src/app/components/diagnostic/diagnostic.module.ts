/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {NgModule} from "@angular/core";
import {SlimLoadingBarModule} from "ng2-slim-loading-bar";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgaModule} from "../../theme/nga.module";
import {DiagnosticService} from "./diagnostic.service";
import {DiagnosticEditorComponent} from "./editor/editor.component";
import {DiagnosticCategoryEditorComponent} from "./category/editor/editor.component";
import {DiagnosticCategorySelectorComponent} from "./category/selector/selector.component";
import {DiagnosticCategoryService} from "./category/category.service";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgaModule,
        SlimLoadingBarModule.forRoot(),
    ],
    declarations: [
        DiagnosticEditorComponent,
        DiagnosticCategoryEditorComponent,
        DiagnosticCategorySelectorComponent,
    ],
    providers: [
        DiagnosticService,
        DiagnosticCategoryService,
    ]
})
export class DiagnosticModule {}