/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Accident } from '../accident/accident';
import { Discount } from '../discount/discount';
/**
 * For the list of the accidents
 */
export class ExtendCaseAccident {

  constructor (
    public accident: Accident = new Accident,
    public discount: Discount = new Discount,
  ) {
  }
}
