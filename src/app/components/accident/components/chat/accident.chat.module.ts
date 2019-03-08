/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { NgModule } from '@angular/core';
import { AccidentChatComponent } from './accident.chat.component';
import { CommentsModule } from '../../../comment/components';

@NgModule({
  imports: [
    CommentsModule,
  ],
  declarations: [
    AccidentChatComponent,
  ],
  exports: [
    AccidentChatComponent,
  ],
})
export class AccidentChatModule {
}
