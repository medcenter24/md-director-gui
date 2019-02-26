/*
 * Copyright (c) 2019.
 *
 *  @author Zagovorychev Oleksandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { GuiDialogDeleteComponent } from './gui.dialog.delete.component';
import { ConfirmDialogModule } from 'primeng/primeng';

@NgModule({
  imports: [
    ConfirmDialogModule,
  ],
  exports: [GuiDialogDeleteComponent],
  declarations: [GuiDialogDeleteComponent],
})
export class GuiDialogDeleteModule {

}
