/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Service} from "../../../../components/service/service";
export const ServicesDb: Service[] = [
    {id: 1, title: 'Sore throat', description: 'When throat is red', price: 100.5},
    {id: 2, title: 'Jellyfish sting', description: 'Sometimes they could be really dangerous', price: 230},
    {id: 3, title: 'Broke leg', description: 'Broke bone\nWith line brake', price: 145},
    {id: 4, title: 'Broke hand', description: 'Broke bone', price: 2000.5},
    {id: 5, title: 'Broke head', description: 'Broke bone', price: 105},
    {id: 6, title: 'Broke finger', description: 'Broke bone', price: 199.99},
    {id: 7, title: 'Broke arm', description: 'Broke bone', price: 100.5},
    {id: 8, title: 'Red eye', description: 'Maybe too many sun', price: 100.5},
    {id: 9, title: 'Temperature', description: 'It could be useful', price: 100.5},
    {id: 10, title: 'Something stuck in the throat', description: 'What could it be?', price: 100.5},
    {id: 11, title: 'Eleventh option', description: 'Diagnostic with that option', price: 100.5}
].map(x => new Service(x.id, x.title, x.description, x.price));
