/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import {
  AfterContentChecked,
  Component,
  OnInit,
} from '@angular/core';
import { ObjectHelper } from '../../../../helpers/object.helper';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GlobalState } from '../../../../global.state';
import { FormService } from '../../form.service';
import { Form } from '../../form';
import { TranslateService } from '@ngx-translate/core';
import { ChangeDetectorRef } from '@angular/core';
import { AuthenticationService } from '../../../auth/authentication.service';
import { FormOption } from '../options/form.option';
import { FormOptionPreview } from '../options/form.option.preview';
import { FormOptionService } from '../options/form.option.service';
declare var $: any;


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
  froalaEditor: any;
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
      'froalaEditor.initialized': (e, editor) => {
        this.froalaEditor = editor;
      },
      'froalaEditor.image.beforeUpload': (e, editor, files) => {
        if (files.length) {
          // Create a File Reader.
          const reader = new FileReader();

          // Set the reader to insert images when they are loaded.
          /*
          TODO FIX UPLOADER
          reader.onload = (ev: FileReaderProgressEvent) => {
            const result = ev.target.result;
            editor.image.insert(result, null, null, editor.image.get());
          };*/

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

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    protected _state: GlobalState,
    private translateService: TranslateService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private authenticationService: AuthenticationService,
    private formOptionService: FormOptionService,
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
      $.FroalaEditor.DefineIcon('vars', { NAME: 'asterisk' });
      $.FroalaEditor.RegisterCommand('vars', {
        title: this.translateService.instant('Choose variables'),
        focus: false,
        undo: false,
        refreshAfterCallback: false,
        callback: () => {
          this.displayDialog = true;
          this.cdRef.detectChanges();
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
              if (typeof this.form.variables === 'string') {
                this.form.variables = JSON.parse(this.form.variables);
                this.encodeVars(this.form.template).then(tmp => {
                  this.form.template = tmp;
                  this.readyToLoad();
                });
              } else {
                this.readyToLoad();
              }
            }).catch(() => this.stopLoader());
          } else {
            this.form = new Form();
            this.readyToLoad();
          }
        });
    });
  }

  private assignFormOptionDeleteBtn(): void {
    const $alert = $('.alert-variable');
    // prevent setting focus to the alert (to not set cursor into)
    $alert.off('click').on('click', function() {
      $(this).parent().html($(this).parent().html());
    });

    // assign correct behavior to the close button
    $('.close-form-option', $alert)
      .off('click')
      .on('click', event => {
        if (this.form.variables) {
          const $el = $(event.target);
          const key = $el.data('key');
          let isFirst = true;
          // delete only the first variable from the list
          this.form.variables = this.form.variables.filter((v: string) => {
            let res = true;
            if (isFirst && v === key) {
              isFirst = false;
              res = false;
            }
            return res;
          });
          $el.parents('.alert').remove();
        }
      });
  }

  ngAfterContentChecked(): void {
    this.assignFormOptionDeleteBtn();
  }

  private readyToLoad(): void {
      this.isLoaded = true;
  }

  private applyToAllViews(tmp, func): Promise<any> {
    return new Promise<string>(resolve => {
      const proceed: string[] = [];
      const promises = [];
      this.form.variables.forEach( (variable: string) => {
        if (!proceed.find(el => el === variable)) {
          proceed.push(variable);
          promises.push(this.getView(variable));
        }
      });
      Promise.all(promises).then(templates => {
        templates.forEach(tmpl => {
          tmp = func(tmpl, tmp);
        });
        resolve(tmp);
      });
    });
  }

  /**
   * Transform from the html view to the variable key
   * @param tmp
   */
  private decodeVars(tmp: string): Promise<string> {
    return this.applyToAllViews(tmp, function(tmpl, _tmp) {
      const regX = new RegExp(tmpl.view, 'g');
      return _tmp.replace(regX, tmpl.key);
    });
  }

  /**
   * Transform to the html view from the variable key
   * @param tmp
   */
  private encodeVars(tmp: string): Promise<string> {
    return this.applyToAllViews(tmp, function(tmpl) {
      const regX = new RegExp(tmpl.key, 'g');
      return tmp.replace(regX, tmpl.view);
    });
  }

  saveForm(): void {
    const tmpForm: Form = new Form();
    ObjectHelper.clone(this.form, tmpForm);
    this.decodeVars(tmpForm.template).then(template => {
      tmpForm.template = template;
      tmpForm.variables = tmpForm.variables.filter(v => template.includes(v));
      this.form.variables = tmpForm.variables;
      this.sendForm(tmpForm);
    });
  }

  private sendForm(form: Form): void {
    const postfix = 'SaveRule';
    this.startLoader(postfix);
    const previousId = this.form.id;
    this.formService.save(form)
      .then(savedForm => {
        this.stopLoader(postfix);
        this.msgs = [];
        this.msgs.push({ severity: 'success', summary: this.translateService.instant('Saved'),
          detail: this.translateService.instant('Successfully saved') });
        this._state.notifyDataChanged('growl', this.msgs);
        if (!previousId) {
          this.router.navigate([`pages/settings/forms/${savedForm.id}`]);
        }
      })
      .catch(() => this.stopLoader(postfix) );
  }

  private getView(key: string): Promise<FormOptionPreview> {
    return this.formOptionService.get(key).then((option: FormOption) => {
      return new FormOptionPreview(key,
        `<span class="alert alert-variable alert-dismissible fade show fr-deletable pl-1 pr-1"`
        + ` contenteditable="false" data-class="${option.key}">`
        + `${option.title}`
        + `<span class="close ml-1">`
        + `<span class="close-form-option" data-key="${option.key}">&times;</span>`
        + `</span>`
        + `</span>`);
    });
  }

  setSelectedVar(formParam: FormOption): void {
    if ( !(this.form.variables instanceof Array) ) {
      this.form.variables = [];
    }
    this.form.variables.push(formParam.key);
    this.getView(formParam.key)
      .then(template => this.froalaEditor.html.insert(template.view));

    this.assignFormOptionDeleteBtn();
    this.displayDialog = false;
  }
}
