/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */
export class AccidentStatus {
    constructor(
        public id: number = 0,
        public title: string = '',
        public description: string = '',
        public caseable_type: string = '',
    ) {}
}
