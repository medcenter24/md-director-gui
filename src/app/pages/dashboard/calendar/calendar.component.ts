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

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CalendarService } from './calendar.service';
import * as jQuery from 'jquery';
import { TranslateService } from '@ngx-translate/core';
import { StatusColorMapService } from '../../../components/accident/components/status/colormap.service';

@Component({
  selector: 'nga-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
  encapsulation: ViewEncapsulation.Native,
})
export class CalendarComponent implements OnInit {

  calendarConfiguration: any = false;
  private _calendar: Object;

  constructor(
    private _calendarService: CalendarService,
    private _translateService: TranslateService,
    private _statusColorService: StatusColorMapService,
    ) {
  }

  ngOnInit() {
    let statistics = [];

    this._translateService.get('Today').subscribe(() => {
      this.calendarConfiguration = {
        buttonIcons: {
          prev: 'left-single-arrow',
          next: 'right-single-arrow',
          prevYear: 'left-double-arrow',
          nextYear: 'right-double-arrow',
        },
        buttonText: {
          today: this._translateService.instant('Today'),
          month: this._translateService.instant('Month'),
          week: this._translateService.instant('Week'),
          day: this._translateService.instant('Day'),
        },
        header: {
          left: 'prevYear,prev,next,nextYear today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay',
        },
        locale: this._translateService.currentLang,
        defaultDate: new Date(),
        selectable: true,
        selectHelper: true,
        editable: false,
        eventLimit: false,
        timeFormat: 'H(:mm)',
        events: (start, end, timezone, callback) => {
          this._calendarService
            .loadEvents(start, end)
            .then(events => {
              statistics = [];
              callback(events);
            });
        },
        eventDataTransform: (event) => {
          return {
            id: event.id,
            title: event.title,
            allDay: false,
            start: event.start,
            end: event.end,
            editable: false,
            color: this._statusColorService.getColorByStatus(event.status),
            status: event.status,
            textColor: '#fff',
          };
        },
        eventRender: (event, element) => {
          const currentDate = event.start.format('YYYY-MM-DD');
          element.css('display', 'none');
          if (statistics.filter(vendor => (vendor.dt === currentDate && vendor.status === event.status)).length > 0) {
            statistics.map(row => {
              if (row.dt === currentDate && row.status === event.status) {
                row.count++;
              }
              return row;
            });
          } else {
            statistics.push({
              dt: currentDate,
              status: event.status,
              count: 1,
            });
          }
        },
        eventAfterAllRender: (view) => {
          const $container = $(view.el);
          const colorService = this._statusColorService;
          const translate = this._translateService;
          $('.fc-day.fc-widget-content', $container).each(function () {
            const $dayContainer = $(this);
            const date = $dayContainer.data('date');
            const events = statistics.filter(row => row.dt === date);
            if (events.length) {
              const $statusesContainer = $('<div>', { 'class' : 'calendar-day-statuses' });
              $dayContainer.append($statusesContainer);
              events.forEach(event => {
                const $countBlock = $(`<div class="fc-event-count ${event.status}"
                        title="${translate.instant(event.status)}">${event.count}</div>`);
                $countBlock.css({
                  'background-color': colorService.getColorByStatus(event.status),
                  color: '#fff',
                });
                $statusesContainer.append($countBlock);
              });
            }
          });
        },
      };
    });
  }

  onCalendarReady(calendar): void {
    this._calendar = calendar;
  }
}
