/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {AccidentStatus} from "../components/accident/components/status/status";
export const AccidentStatusesDb: AccidentStatus[] = [
    {id: 1, title: 'Doctor assigned', description: 'Doctor case'},
    {id: 2, title: 'Doctor started', description: 'Doctor case'},
    {id: 3, title: 'Doctor processed', description: 'Doctor case'},
    {id: 4, title: 'Doctor refused', description: 'Doctor case'},
    {id: 5, title: 'Guarantee letter created', description: 'Hospital case'},
    {id: 6, title: 'Invoice from the Hospital is received', description: 'Hospital case'},
    {id: 7, title: 'Payment guarantee was received', description: 'Hospital case'},
    {id: 8, title: 'Payment', description: 'Hospital case'},
    {id: 9, title: 'Hospital refuse', description: 'Hospital case'},
    {id: 11, title: 'Refuse', description: 'Refuse from director'},
].map(x => new AccidentStatus(x.id, x.title, x.description));
