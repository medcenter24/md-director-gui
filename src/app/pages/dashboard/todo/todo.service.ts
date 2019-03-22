/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2019 (original work) MedCenter24.com;
 */

import {Injectable} from '@angular/core';

@Injectable()
export class TodoService {

  private _todoList = [
    { text: 'Check me out' },
    { text: 'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro' },
    { text: 'Ex has semper alterum, expetenda dignissim' },
    { text: 'Vim an eius ocurreret abhorreant, id nam aeque persius ornatus.' },
    { text: 'Simul erroribus ad usu' },
    { text: 'Ei cum solet appareat, ex est graeci mediocritatem' },
    { text: 'Get in touch with akveo team' },
    { text: 'Write email to business cat' },
    { text: 'Have fun with blur admin' },
    { text: 'What do you think?' },
  ];

  getTodoList() {
    return this._todoList;
  }
}
