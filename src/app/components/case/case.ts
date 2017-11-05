/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

/**
 * For the list of the accidents
 */
export class CaseAccident {

    constructor (
        public id: number = 0,
        public assistantId: number = 0,
        public assistantRefNum: string = '',
        public patientName: string = '',
        public repeated: string = '',
        public refNum: string = '',
        public caseType: string = '',
        public createdAt: string = '',
        public checkpoints: string = '',
        public status: string = '',
        public handlingTime: string = '',
    ) {}
}
