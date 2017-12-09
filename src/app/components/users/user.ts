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
        public password: string = '', /* just for send and update not for get */
        public lang: string = '',
        public thumb_200: string = '',
        public thumb_45: string = '',
    ) {}
}
