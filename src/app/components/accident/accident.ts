/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */
export class Accident {

    constructor(
        public id: number = 0,
        public createdBy: number = 0,
        public parentId: number = 0,
        public patientId: number = 0,
        public accidentTypeId: number = 0,
        public accidentStatusId: number = 0,
        public assistantId: number = 0,
        public caseableId: number = 0,
        public cityId: number = 0,
        public formReportId: number = 0,
        public caseableType: string = 'App/Doctor',
        public caseableCost: number = 0,
        public income: number = 0,
        public fixedIncome: number = 0,
        public refNum: string = '',
        public assistantRefNum: string = '',
        public title: string = '',
        public address: string = '',
        public contacts: string = '',
        public symptoms: string = '',
        public createdAt: string = '',
        public updatedAt: string = '',
        public deletedAt: string = '',
        public closedAt: string = '',
        public handlingTime: string = '',
    ) {}
}
