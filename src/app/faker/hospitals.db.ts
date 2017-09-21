/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Hospital} from "../components/hospital/hospital";
export const HospitalsDb: Hospital[] = [
    {id: 1, title: 'Hospital Marítimo de Torremolinos', address: 'Calle del Sanatorio, 5, 29620 Torremolinos, Málaga, Spain', phones: '34951033701', description: 'El Hospital Marítimo de Torremolinos es un centro hospitalario gestionado por elServicio Andaluz de Salud, ubicado en el municipio español de Torremolinos', ref_key: 'mdt'},
    {id: 2, title: 'Vithas Xanit International Hospital', address: 'Av. de los Argonautas, s/n, 29631 Benalmádena, Málaga, Spain', phones: '34952367190', description: 'Vithas Xanit International Hospital is a private hospital of reference. More than680 service professionals ensure comprehensive and quality health care.', ref_key: 'vxi'},
    {id: 3, title: 'Hospital Costa del Sol', address: 'Autovia A-7, Km 187, 29603 Marbella, Málaga, Spain', phones: '34951976669', description: 'Toda la informacion acerca del Hospital Costa del Sol ubicado en Marbella,Malaga. Areas Clinicas, Ubicacion, Noticias, Historia y mucho mas.', ref_key: 'cds'},
    {id: 4, title: 'Hospital Costa del Sol', address: 'Autovia A-7, Km 187, 29603 Marbella, Málaga, Spain', phones: '34951976669', description: 'Toda la informacion acerca del Hospital Costa del Sol ubicado en Marbella,Malaga. Areas Clinicas, Ubicacion, Noticias, Historia y mucho mas.', ref_key: 'cds'},
    {id: 5, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
    {id: 6, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
    {id: 7, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
    {id: 8, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
    {id: 9, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
    {id: 10, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
    {id: 11, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
    {id: 12, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
    {id: 13, title: 'Medical Care Spain', address: 'Av. de Dénia, 78, 03016 Alicante, Spain', phones: '34634098050', description: 'Visit Medical Care Spain in Alicante, Spain. See contact details, check prices,read reviews, look at pictures, and get directions. Plastic Surgery Clinic Alicante.', ref_key: 'mcs'},
].map(x => new Hospital(x.id, x.title, x.address, x.phones, x.description, x.ref_key));
