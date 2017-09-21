/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { HospitalAccident } from '../components/hospitalAccident/hospitalAccident';

export const HospitalAccidentDb: HospitalAccident[] = [
    {
        id: 1,
        accident_id: 1,
        accident_status_id: 1,
        hospital_id: 1,
        guarantee_id: 1,
        invoice_id: 1,
        form_report_id: 1,
        status: 'new',
        created_at: '2017/03/22 3:50:25',
        updated_at: '',
        deleted_at: '',
    }
].map((x) => new HospitalAccident(
  x.id,
  x.accident_id,
  x.accident_status_id,
  x.hospital_id,
  x.guarantee_id,
  x.invoice_id,
  x.form_report_id,
  x.status,
  x.created_at,
  x.updated_at,
  x.deleted_at)
);
