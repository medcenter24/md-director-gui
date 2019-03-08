/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Hospital {
    constructor(
        public id: number = 0,
        public title: string = '',
        public address: string = '',
        public phones: string = '',
        public description: string = '',
        public refKey: string = '',
    ) {}
}
