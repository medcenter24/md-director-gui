/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */
export class Accident {

    constructor(
        public id: number = 0,
        public created_by: number = 0,
        public parent_id: number = 0,
        public patient_id: number = 0,
        public accident_type_id: number = 0,
        public accident_status_id: number = 0,
        public assistant_id: number = 0,
        public caseable_id: number = 0,
        public city_id: number = 0,
        public form_report_id: number = 0,
        public discount_value: number = 0,
        public discount_id: number = 0,
        public caseable_type: string = 'App/Doctor',
        public ref_num: string = '',
        public assistant_ref_num: string = '',
        public title: string = '',
        public address: string = '',
        public contacts: string = '',
        public symptoms: string = '',
        public created_at: string = '',
        public closed_at: string = '',
    ) {}
}
