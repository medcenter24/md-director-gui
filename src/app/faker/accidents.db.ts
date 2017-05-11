/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Accident} from "../components/accident/accident";
export const AccidentsDb: Accident[] = [
    {
        id: 1,
        created_by: 1,
        parent_id: 1,
        patient_id: 1,
        accident_type_id: 1,
        accident_status_id: 1,
        assistant_id: 1,
        caseable_id: 1,
        city_id: 1,
        form_report_id: 1,
        discount_value: 5.075,
        discount_type_id: 2,
        caseable_type: 'App/Doctor',
        ref_num: 'REF-NUM-accident1',
        title: 'The First Doctor Accident',
        address: 'Uzuarez Adolfo 1B, 44',
        contacts: 'You can call me by phone with 375255283638',
        symptoms: 'Bad weather could cause of the bad fillings',
        created_at: '2017-03-21 12:03:55',
        closed_at: '',
    },
    {
        id: 2,
        created_by: 1,
        parent_id: 0,
        patient_id: 1,
        accident_type_id: 2,
        accident_status_id: 1,
        assistant_id: 1,
        caseable_id: 1,
        city_id: 1,
        form_report_id: 1,
        discount_value: 2,
        discount_type_id: 1,
        caseable_type: 'App/Hospital',
        ref_num: 'REF-NUM-accident2',
        title: 'The Second Hospital Accident',
        address: 'Uzuarez Adolfo 1B, 44',
        contacts: 'You can call me by phone with 375255283638',
        symptoms: 'Bad weather could cause of the bad fillings',
        created_at: '2017-03-21 12:03:55',
        closed_at: '',
    }
].map(x => new Accident(
    x.id,
    x.created_by,
    x.parent_id,
    x.patient_id,
    x.accident_type_id,
    x.accident_status_id,
    x.assistant_id,
    x.caseable_id,
    x.city_id,
    x.form_report_id,
    x.discount_value,
    x.discount_type_id,
    x.caseable_type,
    x.ref_num,
    x.title,
    x.address,
    x.contacts,
    x.symptoms,
    x.created_at,
    x.closed_at
));
