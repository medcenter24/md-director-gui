/*
 * Copyright (c) 2017
 *
 *  @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Service } from '../components/service/service';

export const CaseServicesDb: Service[] = [
  {id: 3, title: 'Broke leg', description: 'Broke bone\nWith line brake', price: 145},
  {id: 5, title: 'Broke head', description: 'Broke bone', price: 105},
  {id: 7, title: 'Broke arm', description: 'Broke bone', price: 100.5},
  {id: 9, title: 'Temperature', description: 'It could be useful', price: 100.5},
].map(x => new Service(x.id, x.title, x.description, x.price));
