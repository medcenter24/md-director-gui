/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, OnInit} from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { CompanyService } from '../../company.service';
import { NgUploaderOptions } from 'ngx-uploader/src/classes/ng-uploader-options.class';
import {Company} from "../../company";

@Component({
    selector: 'nga-company-editor',
    templateUrl: './company.html',
})
export class CompanyEditorComponent extends LoadableComponent implements OnInit {

    protected componentName: string = 'CompanyEditorComponent';

    defaultCompanyLogo: string = 'assets/img/theme/cardiogram.svg';
    defaultCompanySign: string = 'assets/img/theme/notebook.svg';

    constructor(
        private companyService: CompanyService,
    ) {
        super();
    }

    ngOnInit() {
        this.initComponent();
        this.companyService.getCompany()
            .then((company: Company) => {
                this.loadedComponent();
            })
            .catch(() => this.loadedComponent());
    }
}