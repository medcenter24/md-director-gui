/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

export class Doctor {
    constructor(
        public id: number = 0,
        public userId: number = 0,
        public name: string = '',
        public description: string = '',
        public refKey: string = '',
        public medicalBoardNumber: string = '',
    ) { }
}
