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

import { Component, ViewChild, Input, Output, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';
import 'fullcalendar/dist/fullcalendar.js';
import * as jQuery from 'jquery';

@Component({
  selector: 'nga-full-calendar',
  templateUrl: './baFullCalendar.html',
})
export class BaFullCalendarComponent implements AfterViewInit {

  @Input() baFullCalendarConfiguration: Object;
  @Input() baFullCalendarClass: string;
  @Output() onCalendarReady = new EventEmitter<any>();

  @ViewChild('baFullCalendar') _selector: ElementRef;

  ngAfterViewInit() {
    const calendar = jQuery(this._selector.nativeElement).fullCalendar(this.baFullCalendarConfiguration);
    this.onCalendarReady.emit(calendar);
  }
}
