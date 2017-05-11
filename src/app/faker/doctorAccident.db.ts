/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {DoctorAccident} from "../components/doctorAccident/doctorAccident";
export const DoctorAccidentDb: DoctorAccident[] = [
    {
        id: 1,
        accident_id: 1,
        accident_status_id: 1,
        doctor_id: 1,
        city_id: 1,
        status: 'new',
        diagnose: 'Patient broke his leg',
        created_at: '2017/03/22 3:20:25',
        updated_at: '',
        deleted_at: ''
    }
].map((x) => new DoctorAccident(
  x.id,
  x.accident_id,
  x.accident_status_id,
  x.doctor_id,
  x.city_id,
  x.status,
  x.diagnose,
  x.created_at,
  x.updated_at,
  x.deleted_at
));
