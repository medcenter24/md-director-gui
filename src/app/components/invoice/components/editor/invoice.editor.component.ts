/*
 * Copyright (c) 2018
 *
 *  @author Oleksander  Zagovorychev <zagovorichev@gmail.com>
 */

import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NumbersHelper } from '../../../../helpers/numbers.helper';
import { LoadableComponent } from '../../../core/components/componentLoader';
import { Form, FormService } from '../../../forms';
import { AutocompleterComponent } from '../../../ui/selector/components/autocompleter';
import { Upload } from '../../../upload/upload';
import { Invoice } from '../../invoice';
import { InvoiceService } from '../../invoice.service';

@Component({
  selector: 'nga-invoice-editor',
  templateUrl: './invoice.editor.html',
})
export class InvoiceEditorComponent extends LoadableComponent implements OnInit {
  protected componentName: string = 'InvoiceEditorComponent';

  @ViewChild('invoiceFormAutocompleter')
    invoiceFormAutocompleter: AutocompleterComponent;

  @Input() invoice: Invoice;
  @Input() label: string = 'Invoice';
  @Input() autosave: boolean = false;
  @Input() reload: boolean = false; // reload Invoice on the initialization
  @Output() sourceChosen: EventEmitter<Form|Upload> = new EventEmitter<Form|Upload>();
  @Output() saved: EventEmitter<Invoice> = new EventEmitter<Invoice>();

  file: Upload;
  form: Form;
  saving: boolean = false;

  constructor(
    public formService: FormService,
    public invoiceService: InvoiceService,
  ) {
    super();
  }

  ngOnInit() {
    if (!this.invoice) {
      this.invoice = new Invoice();
    } else if (this.reload) {
      this.setInvoice(this.invoice, true);
    }
  }

  formSelected(form: Form): void {
    this.form = form;
    this.sourceChosen.emit(this.form);
    this.doAutoSave();
  }

  onUploaded(file: Upload): void {
    this.file = file;
    this.sourceChosen.emit(file);
    this.doAutoSave();
  }

  onStatusChanged(state: string): void {
    this.invoice.status = state;
    this.doAutoSave();
  }

  priceChanged(event): void {
    this.invoice.price = NumbersHelper.getFixedFloat(event.target.value, true);
    this.doAutoSave();
  }

  private doAutoSave(): void {
    if (this.autosave) {
      this.save();
    }
  }

  /**
   * Replace invoice in the form
   * if invoice has not been loaded - invoice will be requested from the backend
   * @param invoice
   * @param update
   */
  setInvoice(invoice: Invoice, update: boolean = false): void {
    if (update && +invoice.id) {
      const postfix = 'SearchInvoice';
      this.startLoader(postfix);
      this.invoiceService.search({ ids: [invoice.id] }).then(response => {
        this.stopLoader(postfix);
        if (response.data.length) {
          this.invoice = response.data[0] as Invoice;
          if (this.isFormInvoice()) {
            const postfix1 = 'GetInvoiceForm';
            this.startLoader(postfix1);
            this.invoiceService.getForm(this.invoice).then((form: Form) => {
              this.stopLoader(postfix1);
              this.invoiceFormAutocompleter.selectItems(form);
              this.form = form;
            }).catch(() => {
              this.stopLoader(postfix1);
            });
          } else if (this.isFileInvoice()) {
            const postfix2 = 'GetInvoiceFile';
            this.startLoader(postfix2);
            this.invoiceService.getFile(this.invoice).then((file: Upload) => {
              this.stopLoader(postfix2);
              this.file = file;
            }).catch(() => this.stopLoader(postfix2));
          } else {
            throw new Error('Invoice type is not defined');
          }
        } else {
          throw new Error('Invoice not found');
        }
      }).catch(() => this.stopLoader(postfix));
    } else {
      this.invoice = invoice;
    }
  }

  save(): void {
    const postfix = 'SaveInvoice';
    this.startLoader(postfix);
    this.saving = true;
    if (this.isFileInvoice()) {
      this.invoiceService.assignFile(this.invoice, this.file).then( (invoice: Invoice) => {
        this.stopLoader(postfix);
        this.invoice = invoice;
        this.saving = false;
        this.saved.emit(this.invoice);
      }).catch(() => {
        this.stopLoader(postfix);
        this.saving = false;
      });
    } else if (this.isFormInvoice()) {
      this.invoiceService.assignForm(this.invoice, this.form).then((invoice: Invoice) => {
        this.saving = false;
        this.stopLoader(postfix);
        this.invoice = invoice;
        this.saved.emit(this.invoice);
      }).catch(() => {
        this.saving = false;
        this.stopLoader(postfix);
      });
    } else {
      this.saving = false;
      this.stopLoader(postfix);
      throw new Error(`Undefined type of the invoice: ${this.invoice.type}`);
    }
  }

  isFormInvoice(): boolean {
    return this.invoice && this.invoice.type === 'form';
  }

  isFileInvoice(): boolean {
    return this.invoice && this.invoice.type === 'file';
  }
}
