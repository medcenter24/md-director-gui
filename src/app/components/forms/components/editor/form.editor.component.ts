/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalState } from '../../../../global.state';
import { FormService } from '../../form.service';
import { Form } from '../../form';
import { TranslateService } from '@ngx-translate/core';
declare var $: any;
import { ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { FormOption } from '../options/form.option';


// todo until some change in lib.d.ts
interface FileReaderEventTarget extends EventTarget {
  result: string;
}

interface FileReaderEvent extends Event {
  target: FileReaderEventTarget;
  getMessage(): string;
}

@Component({
  selector: 'nga-form-editor',
  templateUrl: './form.editor.html',
})
export class FormEditorComponent extends LoadableComponent implements OnInit, AfterContentChecked {
  protected componentName: string = 'FormEditorComponent';

  isLoaded: boolean = false;
  form: Form;
  msgs: any;
  editorOptions: any = {
    requestWithCORS: true,
    // imageUploadURL: '', // getting from the media service
    // imageCORSProxy: '',
    // imageManagerDeleteMethod: 'DELETE',
    // imageInsertButtons: ['imageBack', '|', 'imageUpload', 'imageByURL'],
    imageDefaultAlign: 'left',
    requestWithCredentials: true,
    imageMaxSize: 1024 * 1024 * 2, // 2 Mb is max size
    placeholderText: 'Loading',
    charCounterCount: false,
    fullPage: false,
    toolbarButtons: [
      'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript',
      '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent',
      'quote', '-', 'insertLink', 'insertImage', 'embedly', 'insertTable', '|',
      'fontFamily', 'fontSize', 'color', 'paragraphStyle', '|', 'specialCharacters', 'insertHR',
      'selectAll', 'clearFormatting', '|', 'html', '|', 'undo', 'redo', '|', 'vars',
    ],
    quickInsertButtons: ['image', 'table', 'ul', 'ol', 'hr', 'vars'],
    events: {
      'froalaEditor.image.beforeUpload': (e, editor, files) => {
        if (files.length) {
          // Create a File Reader.
          const reader = new FileReader();

          // Set the reader to insert images when they are loaded.
          reader.onload = (event: FileReaderEvent) => {
            const result = event.target.result;
            editor.image.insert(result, null, null, editor.image.get());
          };

          // Read image as base64.
          reader.readAsDataURL(files[0]);
        }

        editor.popups.hideAll();

        // Stop default upload chain.
        return false;
      },
      /* 'froalaEditor.image.uploaded': (e, editor, response) => {
        console.log(e, editor, response);
        // stop default image chain
        return false;
      }, */
      /*'froalaEditor.imageManager.imageLoaded': function (e, editor, $img) {
        console.log('imageLoaded', e, editor, $img);
      },
      'froalaEditor.imageManager.imagesLoaded': function (e, editor, data) {
        console.log('images', e, editor, data);
        // Stop default image chain.
        return false;
      }*/
    },
  };

  displayDialog: boolean = false;
  froalaEditor: any;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    protected _state: GlobalState,
    private translateService: TranslateService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.translateService.get('Form content is here').subscribe(translation => {
      this.editorOptions.placeholderText = translation;
      this.editorOptions.language = this.translateService.currentLang;
      // do not load images at all, I'm going to use b64 as a text for forms as I don't expect a lot of images
      //
      // this.editorOptions.imageUploadURL = this.mediaService.getUrl();
      // this.editorOptions.imageCORSProxy = this.mediaService.getUrl();
      // this.editorOptions.imageManagerLoadURL = this.mediaService.getUrl();

      // to save text I guess no
      this.editorOptions.requestHeaders = {
        'Authorization': `Bearer ${this.authenticationService.getToken()}`,
      };
      const self = this;
      $.FroalaEditor.DefineIcon('vars', { NAME: 'asterisk' });
      $.FroalaEditor.RegisterCommand('vars', {
        title: this.translateService.instant('Choose variables'),
        focus: false,
        undo: false,
        refreshAfterCallback: false,

        callback: function callback () {
          self.displayDialog = true;
          self.froalaEditor = this;
          self.cdRef.detectChanges();
        },
      });

      this.route.params
        .subscribe((params: Params) => {
          this._state.notifyDataChanged('menu.activeLink', { title: 'Forms' });
          const id = +params['id'];
          if (id) {
            this.startLoader();
            this.formService.getForm(id).then((form: Form) => {
              this.stopLoader();
              this.form = form;
              this.readyToLoad();
            }).catch(() => this.stopLoader());
          } else {
            this.form = new Form();
            this.readyToLoad();
          }
        });
    });
  }

  ngAfterContentChecked(): void {
    // bind event to delete variables
    const $alert = $('.alert-variable');
    $('.close', $alert).off('click').on('click', function () {
      $(this).parents('.alert').remove();
    });
  }

  private readyToLoad(): void {
      this.isLoaded = true;
  }

  saveForm(): void {
    const postfix = 'SaveRule';
    this.startLoader(postfix);
    const previousId = this.form.id;
    this.formService.save(this.form)
      .then(form => {
        this.stopLoader(postfix);
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: this.translateService.instant('Saved'),
          detail: this.translateService.instant('Successfully saved') });
        this._state.notifyDataChanged('growl', this.msgs);
        if (!previousId) {
          this.router.navigate([`pages/settings/forms/${form.id}`]);
        }
      })
      .catch(() => this.stopLoader(postfix) );
  }

  setSelectedVar(formParam: FormOption): void {
    this.froalaEditor.html.insert(`&nbsp;<span class="alert alert-variable alert-dismissible fade show fr-deletable"
            contenteditable="false" role="alert" data-class="${formParam.key}">
              ${formParam.title}
              <span class="close" data-dismiss="alert">
                <span aria-hidden="true">&times;</span>
              </span>
            </span>&nbsp;`);

    // bind event to delete variables
    const $alert = $('.alert-variable');
    $('.close', $alert).off('click').on('click', function () {
      $(this).parents('.alert').remove();
    });
  }
}
