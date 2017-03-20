/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Patient {
    constructor(
        public id: number,
        public name: string,
        public address: string,
        public phones: string,
        public birthday: string,
        public comment: string,
    ) {}
}
