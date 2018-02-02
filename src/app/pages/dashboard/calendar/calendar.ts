/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class CalendarEvent {
  constructor(
    public id: number = 0,
    public title: string = '',
    public start: any = '',
    public end: string = '',
    public status: string = '',
  ) { }
}
