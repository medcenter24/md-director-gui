/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Accident } from '../accident/accident';
/**
 * For the list of the accidents
 */
export class ExtendCaseAccident {

  constructor (
    public accident: Accident = new Accident(),
  ) {
  }
}
