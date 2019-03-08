/*
 * Copyright (c) 2018.
 *
 * @author Zagovorychev Olexandr <zagovorichev@gmail.com>
 */

import { Configurable } from '../configurable';

export class SimpleConfig extends Configurable {
  constructor (
    public prop1: number = 0,
  ) {
    super();
  }
}
