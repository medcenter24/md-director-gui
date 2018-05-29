import { Injectable } from '@angular/core';
import { HttpService } from '../../../components/core/http/http.service';
import { CalendarEvent } from './calendar';
import { Moment } from 'moment';

@Injectable()
export class CalendarService extends HttpService {

  protected getPrefix (): string {
    return 'director/statistics/calendar';
  }

  /**
   * @returns {Promise<any>}
   */
  loadEvents(start: Moment, end: Moment): Promise<CalendarEvent[]> {
    return this.get(null, { start: start.format('YYYY-MM-DD'), end: end.format('YYYY-MM-DD') })
      .then(response => response.data as CalendarEvent[]);
  }
}
