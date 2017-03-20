/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Patient} from "../components/patient/patient";
export const PatientsDb: Patient[] = [
    {id: 1, name: 'Patient Name', address: 'Address of the patient', phones: '375255283638', birthday: '30/05/1986', comment: 'My First Patient'},
].map(x => new Patient(x.id, x.name, x.address, x.phones, x.birthday, x.comment));
