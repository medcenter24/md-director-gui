/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { CaseAccident } from '../components/case/case';
export const CasesDb: CaseAccident[] = [
  {
    id: 1, // accident id
    assistantId: 1,
    patientName: 'Foster',
    repeated: 'Second time',
    refNum: 'G001-0101-TFF',
    assistantRefNum: 'RN-1',
    caseType: 'DoctorAccident',
    createdAt: '2017-03-23 10:40:11',
    checkpoints: 'guarantee,checkedLDM,paidLDM',
    status: 'new',
  },
  {
    id: 2, // accident id
    assistantId: 2,
    patientName: 'Foster',
    repeated: 'First time',
    refNum: 'G002-0101-TFF',
    assistantRefNum: 'RN-2',
    caseType: 'DoctorAccident',
    createdAt: '2017-03-23 10:40:11',
    checkpoints: '',
    status: 'new',
  },
].map(x => new CaseAccident(x.id, x.assistantId, x.patientName, x.repeated, x.refNum,
    x.assistantRefNum, x.caseType, x.createdAt, x.checkpoints, x.status));
