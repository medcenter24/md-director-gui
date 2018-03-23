/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

export class DatePeriod {
  constructor(
    /**
     * from string - formatted string
     * example:
     *    from 'sat 00:00' to 'sun 23:59'
     *    from '21:00' to '6:00'
     */

    public from: string = '',
    public to: string = '',
    // day / night / weekend
    public key: string = '',
  ) { }
}
