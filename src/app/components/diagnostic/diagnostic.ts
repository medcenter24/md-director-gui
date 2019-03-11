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
        public diagnosticCategoryId: number = 0,
        public diseaseCode: string = '',
        public type: string = '',
    ) {}
}
