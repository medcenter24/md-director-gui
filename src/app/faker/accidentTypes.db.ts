/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {AccidentType} from "../components/accident/type/type";
export const AccidentTypesDb: AccidentType[] = [
    {id: 1, title: 'Insurance case', description: 'In assistance will be prepared report'},
    {id: 2, title: 'Non-insured case', description: 'Refusal will be sent to assistance'},
].map(x => new AccidentType(x.id, x.title, x.description));
