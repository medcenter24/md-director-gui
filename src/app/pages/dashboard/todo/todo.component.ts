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

import {Component} from '@angular/core';
import {BaThemeConfigProvider} from '../../../theme';

import {TodoService} from './todo.service';

import 'style-loader!./todo.scss';

@Component({
  selector: 'todo',
  templateUrl: './todo.html'
})
export class Todo {

  public dashboardColors = this._baConfig.get().colors.dashboard;

  public todoList:Array<any>;
  public newTodoText:string = '';

  constructor(private _baConfig:BaThemeConfigProvider, private _todoService:TodoService) {
    this.todoList = this._todoService.getTodoList();

    this.todoList.forEach((item) => {
      item.color = this._getRandomColor();
    });
  }

  getNotDeleted() {
    return this.todoList.filter((item:any) => {
      return !item.deleted
    })
  }

  addToDoItem($event) {

    if (($event.which === 1 || $event.which === 13) && this.newTodoText.trim() != '') {

      this.todoList.unshift({
        text: this.newTodoText,
        color: this._getRandomColor(),
      });
      this.newTodoText = '';
    }
  }

  private _getRandomColor() {
    let colors = Object.keys(this.dashboardColors).map(key => this.dashboardColors[key]);

    var i = Math.floor(Math.random() * (colors.length - 1));
    return colors[i];
  }
}
