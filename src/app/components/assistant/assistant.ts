/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Assistant {
    constructor(
        public id: number = 0,
        public title: string = '',
        public email: string = '',
        public commentary: string = '',
        public refKey: string = '',
    ) {}
}
