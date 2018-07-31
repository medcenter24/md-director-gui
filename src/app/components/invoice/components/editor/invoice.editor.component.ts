/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Form, FormService } from '../../../forms';
import { Upload } from '../../../upload/upload';
import { Invoice } from '../../invoice';

@Component({
  selector: 'nga-invoice-editor',
  templateUrl: './invoice.editor.html',
})
export class InvoiceEditorComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'InvoiceEditorComponent';

  @Input() invoice: Invoice;

  @Output() sourceChosen: EventEmitter<Form|Upload> = new EventEmitter<Form|Upload>();

  invoiceFile: Upload;
  invoiceForm: Form;

  constructor(
    public formService: FormService,
  ) {
    super();
  }

  ngOnInit() {
    if (!this.invoice) {
      this.invoice = new Invoice();
    }
  }

  formSelected(form: Form): void {
    this.invoiceForm = form;
    this.sourceChosen.emit(this.invoiceForm);
  }

  onUploaded(file: Upload): void {
    this.invoiceFile = file;
    this.sourceChosen.emit(file);
  }

}
