/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Diagnostic {
    constructor(
        public id: number = 0,
        public title: string = '',
        public description: string = '',
        public diagnostic_category_id: number = 0,
        public comment: string = ''
    ) {}
}
