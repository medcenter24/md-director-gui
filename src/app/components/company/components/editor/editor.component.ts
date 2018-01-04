/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { CompanyService } from '../../company.service';
import { NgUploaderOptions } from 'ngx-uploader/src/classes/ng-uploader-options.class';
import { Company } from '../../company';
import { LoggedUserService } from '../../../auth/loggedUser.service';
import { AuthenticationService } from '../../../auth/authentication.service';

@Component({
    selector: 'nga-company-editor',
    templateUrl: 'editor.html',
})
export class CompanyEditorComponent extends LoadableComponent implements OnInit {

    protected componentName: string = 'CompanyEditorComponent';

    defaultCompanyLogo: string = 'assets/img/theme/cardiogram.svg';
    defaultCompanySign: string = 'assets/img/theme/notebook.svg';

    pictureSign: string = '';
    pictureLogo: string = '';

    uploaderLogoOptions: NgUploaderOptions = {
        url: '',
        cors: true,
        authToken: '',
        calculateSpeed: true,
    };
    uploaderSignOptions: NgUploaderOptions = {
        url: '',
        cors: true,
        authToken: '',
        calculateSpeed: true,
    };

    company: Company;

    constructor(
        private companyService: CompanyService,
        private loggedUserService: LoggedUserService,
        private authService: AuthenticationService,
    ) {
        super();
    }

    ngOnInit() {
        this.initComponent();
        this.loggedUserService.getCompany()
            .then((company: Company) => {
                this.company = company;

                this.pictureLogo = this.company.logo250.length ? `data:image/jpeg;base64,${this.company.logo250}` : '';
                this.pictureSign = this.company.sign ? `data:image/jpeg;base64,${this.company.sign}` : '';
                this.uploaderLogoOptions.url = this.companyService.getUrl(`${this.company.id}/logo`);
                // todo add global trigger refresh token and bind all relative things to it
                this.uploaderLogoOptions.authToken = this.authService.getToken();
                this.uploaderSignOptions.authToken = this.authService.getToken();
                this.uploaderSignOptions.url = this.companyService.getUrl(`${this.company.id}/sign`);
                this.loadedComponent();
            })
            .catch(() => this.loadedComponent());
    }

    saveCompany(): void {
        this.initComponent();
        this.companyService.update(this.company)
            .then(() => this.loadedComponent())
            .catch(() => this.loadedComponent());
    }

    startCompanyLogoUpload(event): void {
        this.initComponent();
    }

    endCompanyLogoUpload(event): void {
        this.loadedComponent();
    }

    startCompanySignatureUpload(event): void {
        this.initComponent();
    }

    endCompanySignatureUpload(event): void {
        this.loadedComponent();
    }

    deleteSignature(): void {
        this.initComponent();
        this.companyService.deleteSignature(this.company)
            .then( () => this.loadedComponent() )
            .catch( () => this.loadedComponent() );
    }

    deleteCompanyLogo(): void {
        this.initComponent();
        this.companyService.deleteLogo(this.company)
            .then( () => this.loadedComponent() )
            .catch( () => this.loadedComponent() );
    }
}
