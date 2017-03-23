/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {DoctorAccident} from "../components/doctorAccident/doctorAccident";
export const DoctorAccidentsDb: DoctorAccident[] = [
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
    },
    {
        id: 2,
        accident_id: 2,
        accident_status_id: 3,
        doctor_id: 1,
        city_id: 1,
        status: 'closed',
        diagnose: 'Sore throat',
        created_at: '2017/03/22 3:50:25',
        updated_at: '',
        deleted_at: ''
    },
    {
        id: 3,
        accident_id: 3,
        accident_status_id: 1,
        doctor_id: 2,
        city_id: 3,
        status: 'started',
        diagnose: 'Started status',
        created_at: '2017/03/22 3:50:25',
        updated_at: '',
        deleted_at: ''
    },
    {
        id: 4,
        accident_id: 4,
        accident_status_id: 1,
        doctor_id: 2,
        city_id: 3,
        status: 'signed',
        diagnose: 'Signed status',
        created_at: '2017/03/22 3:50:25',
        updated_at: '',
        deleted_at: ''
    },
    {
        id: 5,
        accident_id: 5,
        accident_status_id: 1,
        doctor_id: 2,
        city_id: 3,
        status: 'sent',
        diagnose: 'Sent status',
        created_at: '2017/03/22 3:50:25',
        updated_at: '',
        deleted_at: ''
    },
    {
        id: 6,
        accident_id: 6,
        accident_status_id: 1,
        doctor_id: 2,
        city_id: 3,
        status: 'paid',
        diagnose: 'Paid status',
        created_at: '2017/03/22 3:50:25',
        updated_at: '',
        deleted_at: ''
    },
    {
        id: 7,
        accident_id: 7,
        accident_status_id: 1,
        doctor_id: 2,
        city_id: 3,
        status: 'closed',
        diagnose: 'Closed status',
        created_at: '2017/03/22 3:50:25',
        updated_at: '',
        deleted_at: ''
    },
].map((x) => new DoctorAccident(x.id))
