/*
 *  Copyright (c) 2017.
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader/LoadableComponent';
import { CompanyService } from '../../company.service';
import { Company } from '../../company';
import { LoggedUserService } from '../../../auth/loggedUser.service';
import { AuthenticationService } from '../../../auth/authentication.service';
import { UploaderOptions, UploadFile, UploadInput, humanizeBytes, UploadOutput } from 'ngx-uploader';
import { GlobalState } from '../../../../global.state';

@Component({
  selector: 'nga-company-editor',
  templateUrl: 'company.editor.html',
})
export class CompanyEditorComponent extends LoadableComponent implements OnInit {

  protected componentName: string = 'CompanyEditorComponent';

  defaultCompanyLogo: string = 'assets/img/theme/cardiogram.svg';
  defaultCompanySign: string = 'assets/img/theme/notebook.svg';

  pictureSign: string = '';
  pictureLogo: string = '';

  eventSignToUpload: UploadInput;
  eventLogoToUpload: UploadInput;

  uploaderLogoOptions: UploaderOptions;
  uploaderSignOptions: UploaderOptions;

  company: Company;

  uploadLogoInput: EventEmitter<UploadInput>;
  uploadSignInput: EventEmitter<UploadInput>;

  dragOver: boolean;

  logoFiles: UploadFile[];
  signFiles: UploadFile[];
  humanizeLogoBytes: Function;
  humanizeSignBytes: Function;

  constructor(private companyService: CompanyService,
              private loggedUserService: LoggedUserService,
              private authService: AuthenticationService,
              protected _state: GlobalState,
  ) {
    super();
    this.logoFiles = []; // local uploading files array
    this.signFiles = [];
    this.uploadSignInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.uploadLogoInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeLogoBytes = humanizeBytes;
    this.humanizeSignBytes = humanizeBytes;
  }

  ngOnInit() {
    this.startLoader();
    this.loggedUserService.getCompany()
      .then((company: Company) => {
        this.stopLoader();

        this.company = company;

        this.pictureLogo = this.company.logo250.length ? `data:image/jpeg;base64,${this.company.logo250}` : '';
        this.pictureSign = this.company.sign ? `data:image/jpeg;base64,${this.company.sign}` : '';

        this.eventLogoToUpload = {
          type: 'uploadAll',
          url: this.companyService.getUrl(`${this.company.id}/logo`),
          method: 'POST',
          headers: { 'Authorization': `Bearer ${this.authService.getToken()}` },
        };

        this.eventSignToUpload = {
          type: 'uploadAll',
          url: this.companyService.getUrl(`${this.company.id}/sign`),
          method: 'POST',
          headers: { 'Authorization': `Bearer ${this.authService.getToken()}` },
        };
      })
      .catch(() => this.stopLoader());

    this._state.subscribe('token', (token) => {
      this.eventLogoToUpload.headers = { 'Authorization': `Bearer ${token}` };
      this.eventSignToUpload.headers = { 'Authorization': `Bearer ${token}` };
    });
  }

  saveCompany(): void {
    const postfix = 'SaveCompany';
    this.startLoader(postfix);
    this.companyService.update(this.company)
      .then(() => this.stopLoader(postfix))
      .catch(() => this.stopLoader(postfix));
  }

  startCompanyLogoUpload(event): void {
    this.startLoader('CompanyLogoUpload');
  }

  endCompanyLogoUpload(event): void {
    this.stopLoader('CompanyLogoUpload');
  }

  startCompanySignatureUpload(event): void {
    this.startLoader('CompanySignUpload');
  }

  endCompanySignatureUpload(event): void {
    this.stopLoader('CompanySignUpload');
  }

  deleteSignature(): void {
    const postfix = 'DeleteSign';
    this.startLoader(postfix);
    this.companyService.deleteSignature(this.company)
      .then(() => this.stopLoader(postfix))
      .catch(() => this.stopLoader(postfix));
  }

  deleteCompanyLogo(): void {
    const postfix = 'DeleteCompanyLogo';
    this.startLoader(postfix);
    this.companyService.deleteLogo(this.company)
      .then(() => this.stopLoader(postfix))
      .catch(() => this.stopLoader(postfix));
  }

}
