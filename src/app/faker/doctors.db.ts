/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Doctor} from "../components/doctors/doctor";
export const DoctorsDb: Doctor[] = [
    {id: 1, name: 'Foster Abigail', description: 'Medic of the United States', ref_key: 'fa', user_id: 0},
    {id: 2, name: 'Peter Long', description: 'Another medic of the tenerife island', ref_key: 'pl', user_id: 1},
    {id: 3, name: 'Lucy Jinse', description: 'A woman doctor in Colorado', ref_key: 'lj', user_id: 0},
    {id: 4, name: 'Graham Ali', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'ga', user_id: 0},
    {id: 5, name: 'Constantin Vamp', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0},
    {id: 6, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0},
    {id: 7, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0},
    {id: 8, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0},
    {id: 9, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0},
    {id: 10, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0},
    {id: 11, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0},
    {id: 12, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0},
    {id: 13, name: 'Foster Abigail', description: 'Doctor is a surge, who work in Benidorm', ref_key: 'cv', user_id: 0}
].map(x => new Doctor(x.id, x.user_id, x.name, x.description, x.ref_key));
