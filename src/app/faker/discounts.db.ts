/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Discount } from '../components/discount/discount';

export const DiscountsDb: Discount[] = [
  {id: 1, title: '%', description: 'Percent from the amount', operation: '*'},
  {id: 2, title: 'EUR', description: 'Value to sub from the total amount of the accident', operation: '-'},
].map(x => new Discount(x.id, x.title, x.description, x.operation));
