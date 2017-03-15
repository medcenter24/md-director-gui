/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Doctor } from "../stuff/doctor";

export const DoctorsDb: Doctor[] = [
    {id: 1, name: 'Foster Abigail', description: 'Medic of the United States', ref_key: 'fa'},
    {id: 2, name: 'Peter Long', description: 'Another medic of the tenerife island', ref_key: 'pl'},
    {id: 3, name: 'Lucy Jinse', description: 'A woman doctor in Colorado', ref_key: 'lj'},
    {id: 4, name: 'Graham Ali', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'ga'},
    {id: 5, name: 'Constantin Vamp', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'},
    {id: 6, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'},
    {id: 7, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'},
    {id: 8, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'},
    {id: 9, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'},
    {id: 10, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'},
    {id: 11, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'},
    {id: 12, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'},
    {id: 13, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv'}
].map(x => new Doctor(x.id, x.name, x.description, x.ref_key));
