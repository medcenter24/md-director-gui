/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */
export class AccidentScenario {
    constructor(
        public id: number = 0,
        public accidentStatusId: number = 0,
        public order: number = 0,
        public mode: string = '',
        public tag: string = '',
        public status: string = '',
        public title: string = '',
    ) {}
}
