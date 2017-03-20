/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {City} from "../components/city/city";
export const CitiesDb: City[] = [
    {id: 1, title: 'Barcelona'},
    {id: 2, title: 'Benidorm'},
    {id: 3, title: 'Madrid'},
    {id: 4, title: 'Seville'},
    {id: 5, title: 'Bilbao'},
    {id: 6, title: 'Malaga'},
    {id: 7, title: 'Granada'},
    {id: 8, title: 'Cordoba'},
    {id: 9, title: 'Valencia'},
    {id: 10, title: 'Zaragoza'},
    {id: 11, title: 'Palma, Majorca'},
].map(x => new City(x.id, x.title));
