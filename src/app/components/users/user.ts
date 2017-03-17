/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class User {
    constructor(
        public id: number = 0,
        public name: string = '',
        public email: string = '',
        public phone: string = '',
    ) {}
}
