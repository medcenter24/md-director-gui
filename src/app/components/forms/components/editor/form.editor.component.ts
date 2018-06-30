/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { ActivatedRoute, Params } from '@angular/router';
import { GlobalState } from '../../../../global.state';
import { FormService } from '../../form.service';
import { Form } from '../../form';

@Component({
  selector: 'nga-form-editor',
  templateUrl: './form.editor.html',
  styleUrls: ['./form.editor.scss'],
})
export class FormEditorComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'FormEditorComponent';

  isLoaded: boolean = false;
  form: Form;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    protected _state: GlobalState,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((params: Params) => {
        this._state.notifyDataChanged('menu.activeLink', { title: 'Forms' });
        const id = +params[ 'id' ];
        if (id) {
          this.startLoader();
          this.formService.getForm(id).then((form: Form) => {
            this.stopLoader();
            this.form = form;
            this.isLoaded = true;
          }).catch(() => this.stopLoader());
        } else {
            this.form = new Form();
            this.isLoaded = true;
        }
      });
  }

  saveForm(): void {
    const postfix = 'saveRule';
    this.startLoader(postfix);
    this.formService.save(this.form)
      .then(() => this.stopLoader(postfix))
      .catch(() => this.stopLoader(postfix));
  }
}
