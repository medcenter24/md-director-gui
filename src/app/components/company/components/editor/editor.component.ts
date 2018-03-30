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

  uploaderLogoOptions: UploaderOptions;
  uploaderSignOptions: UploaderOptions;

  company: Company;

  uploadLogoInput: EventEmitter<UploadInput>;
  uploadSignInput: EventEmitter<UploadInput>;

  humanizeBytes: Function;
  dragOver: boolean;

  formData: FormData;
  logoFiles: UploadFile[];
  signFiles: UploadFile[];
  humanizeLogoBytes: Function;
  humanizeSignBytes: Function;

  constructor(private companyService: CompanyService,
              private loggedUserService: LoggedUserService,
              private authService: AuthenticationService,) {
    super();
    this.logoFiles = []; // local uploading files array
    this.signFiles = [];
    this.uploadSignInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.uploadLogoInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeLogoBytes = humanizeBytes;
    this.humanizeSignBytes = humanizeBytes;
  }

  ngOnInit() {
    this.initComponent();
    this.loggedUserService.getCompany()
      .then((company: Company) => {
        this.company = company;

        this.pictureLogo = this.company.logo250.length ? `data:image/jpeg;base64,${this.company.logo250}` : '';
        this.pictureSign = this.company.sign ? `data:image/jpeg;base64,${this.company.sign}` : '';
        /*this.uploaderLogoOptions.url = this.companyService.getUrl(`${this.company.id}/logo`);
        // todo add global trigger refresh token and bind all relative things to it
        this.uploaderLogoOptions.authToken = this.authService.getToken();
        this.uploaderSignOptions.authToken = this.authService.getToken();
        this.uploaderSignOptions.url = this.companyService.getUrl(`${this.company.id}/sign`);*/
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
      .then(() => this.loadedComponent())
      .catch(() => this.loadedComponent());
  }

  deleteCompanyLogo(): void {
    this.initComponent();
    this.companyService.deleteLogo(this.company)
      .then(() => this.loadedComponent())
      .catch(() => this.loadedComponent());
  }




  //// new features

  onUploadOutput(output: UploadOutput): void {
    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' }
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue'  && typeof output.file !== 'undefined') { // add file to array when added
      this.signFiles.push(output.file);
    } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {
      // update current data in files array for uploading file
      const index = this.signFiles.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
      this.signFiles[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.signFiles = this.signFiles.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') {
      this.dragOver = true;
    } else if (output.type === 'dragOut') {
      this.dragOver = false;
    } else if (output.type === 'drop') {
      this.dragOver = false;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' }
    };

    this.uploadSignInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadSignInput.emit({ type: 'cancel', id });
  }

  removeFile(id: string): void {
    this.uploadSignInput.emit({ type: 'remove', id });
  }

  removeAllFiles(): void {
    this.uploadSignInput.emit({ type: 'removeAll' });
  }


}
