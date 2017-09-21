/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Diagnostic } from '../components/diagnostic/diagnostic';

export const CaseDiagnosticsDb: Diagnostic[] = [
  {id: 2, title: 'Jellyfish sting', description: 'Sometimes they could be really dangerous', diagnostic_category_id: 1, comment: ''},
  {id: 3, title: 'Broke leg', description: 'Broke bone\nWith line brake', diagnostic_category_id: 1, comment: ''},
  {id: 9, title: 'Temperature', description: 'It could be useful', diagnostic_category_id: 5, comment: ''},
].map(x => new Diagnostic(x.id, x.title, x.description, x.diagnostic_category_id, x.comment));
