/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Diagnostic } from "../components/diagnostic/diagnostic";

export const DiagnosticsDb: Diagnostic[] = [
    {id: 1, title: 'Sore throat', description: 'When throat is red', diagnostic_category_id: 1, comment: 'Hola, Spain'},
    {id: 2, title: 'Jellyfish sting', description: 'Sometimes they could be really dangerous', diagnostic_category_id: 1, comment: ''},
    {id: 3, title: 'Broke leg', description: 'Broke bone', diagnostic_category_id: 1, comment: ''},
    {id: 4, title: 'Broke hand', description: 'Broke bone', diagnostic_category_id: 1, comment: ''},
    {id: 5, title: 'Broke head', description: 'Broke bone', diagnostic_category_id: 3, comment: ''},
    {id: 6, title: 'Broke finger', description: 'Broke bone', diagnostic_category_id: 3, comment: ''},
    {id: 7, title: 'Broke arm', description: 'Broke bone', diagnostic_category_id: 4, comment: ''},
    {id: 8, title: 'Red eye', description: 'Maybe too many sun', diagnostic_category_id: 5, comment: ''},
    {id: 9, title: 'Temperature', description: 'It could be useful', diagnostic_category_id: 5, comment: ''},
    {id: 10, title: 'Something stuck in the throat', description: 'What could it be?', diagnostic_category_id: 5, comment: ''},
    {id: 11, title: 'Eleventh option', description: 'Diagnostic with that option', diagnostic_category_id: 5, comment: ''}
].map(x => new Diagnostic(x.id, x.title, x.description, x.diagnostic_category_id, x.comment));
