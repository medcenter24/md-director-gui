/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Discount} from "../components/discount/discount";
export const DiscountsDb: Discount[] = [
    {
        id: 1,
        amount: 20.5,
        type: 'euro/case',
        comment: 'From each case we will take this amount'
    },{
        id: 2,
        amount: 5,
        type: '%/case',
        comment: 'From each case we will take this amount'
    },{
        id: 3,
        amount: 5000,
        type: 'euro/year',
        comment: 'Once an year we will take that amount for all invoices, so start will be from negative number'
    }
].map(x => new Discount(x.id, x.amount, x.type));
