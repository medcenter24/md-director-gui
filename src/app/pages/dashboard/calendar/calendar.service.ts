import { Injectable } from '@angular/core';
import { HttpService } from '../../../components/http/http.service';
import { CalendarEvent } from './calendar';

@Injectable()
export class CalendarService extends HttpService {

  protected getPrefix (): string {
    return 'director/statistics/calendar';
  }

  /**
   * @returns {Promise<any>}
   */
  loadEvents(start, end): Promise<CalendarEvent[]> {
    return this.get(null, `start=${start.format('YYYY-MM-DD')}&end=${end.format('YYYY-MM-DD')}`)
      .then(response => response.json().data as CalendarEvent[]);
  }
}
