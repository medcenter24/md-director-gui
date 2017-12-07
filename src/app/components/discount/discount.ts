/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */
export class Discount {
    constructor(
        public id: number = 0,
        public title: string = '',
        public description: string = '',
        public operation: string = '',
    ) {}
}
