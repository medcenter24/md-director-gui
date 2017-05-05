/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { AccidentDiscount } from '../components/accident/components/discount/discount';
export const AccidentDiscountsDb: AccidentDiscount[] = [
  {id: 1, title: '%', description: 'Percent from the amount', operation: '*'},
  {id: 2, title: 'EUR', description: 'Value to sub from the total amount of the accident', operation: '-'},
].map(x => new AccidentDiscount(x.id, x.title, x.description, x.operation));
