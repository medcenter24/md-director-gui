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
