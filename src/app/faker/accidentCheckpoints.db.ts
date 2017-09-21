/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { AccidentCheckpoint } from '../components/accident/components/checkpoint/checkpoint';
export const AccidentCheckpointsDb: AccidentCheckpoint[] = [
  {id: 1, title: 'Medical appointed was prepared', description: 'Notices about checkpoint'},
  {id: 2, title: 'Received a guarantee for the amount of', description: ''},
  {id: 3, title: 'Issued a guarantee by LDM', description: ''},
  {id: 4, title: 'Guarantee for the hospital', description: 'Could be added cross course? TODO'},
  {id: 5, title: 'Sent to the LDM', description: ''},
  {id: 6, title: 'Checked LDM', description: ''},
  {id: 7, title: 'Documents sent to the Insurance Company', description: ''},
  {id: 8, title: 'Paid by Insurance Company', description: ''},
  {id: 9, title: 'Paid LDM', description: ''},
  {id: 10, title: 'Paid to the hospital', description: ''},
  {id: 11, title: 'Accident Closed', description: ''},
].map(x => new AccidentCheckpoint(x.id, x.title, x.description));
