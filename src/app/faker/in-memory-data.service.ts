/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable } from '@angular/core';

import {
  InMemoryDbService,
  ParsedUrl,
} from 'angular-in-memory-web-api';
import { DoctorsDb } from './doctors.db';
import { ServicesDb } from './services.db';
import { UsersDb } from './users.db';
import { DiagnosticsDb } from './diagnostics.db';
import { DiagnosticCategoriesDb } from './diagnosticCategories.db';
import { Diagnostic } from '../components/diagnostic/diagnostic';
import { DiagnosticCategory } from '../components/diagnostic/category/category';
import { Service } from '../components/service/service';
import { Doctor } from '../components/doctors/doctor';
import { User } from '../components/users/user';
import { City } from '../components/city/city';
import { Hospital } from '../components/hospital/hospital';
import { CitiesDb } from './cities.db';
import { HospitalsDb } from './hospitals.db';
import { AccidentType } from '../components/accident/components/type/type';
import { AccidentTypesDb } from './accidentTypes.db';
import { AccidentCheckpoint } from '../components/accident/components/checkpoint/checkpoint';
import { AccidentCheckpointsDb } from './accidentCheckpoints.db';
import { AccidentStatusesDb } from './accidentStatuses.db';
import { AccidentStatus } from '../components/accident/components/status/status';
import { Assistant } from '../components/assistant/assistant';
import { AssistantsDb } from './assistants.db';
import { Patient } from '../components/patient/patient';
import { PatientsDb } from './patients.db';
import { Accident } from '../components/accident/accident';
import { AccidentsDb } from './accidents.db';
import { CasesDb } from './cases.db';
import { CaseAccident } from '../components/case/case';
import { URLSearchParams } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import { CaseServicesDb } from './CaseServicesDb.db';
import { DoctorAccident } from '../components/doctorAccident/doctorAccident';
import { DoctorAccidentDb } from './doctorAccident.db';
import { HospitalAccident } from '../components/hospitalAccident/hospitalAccident';
import { HospitalAccidentDb } from './hospitalAccident.db';
import { CaseDiagnosticsDb } from './CaseDiagnosticsDb.db';
import { CaseImportDb } from './CaseImport.db';
import { Discount } from '../components/discount/discount';
import { DiscountsDb } from './discounts.db';

class UrlStructure implements ParsedUrl {
  base: string;
  collectionName: string;
  id: string;
  query: URLSearchParams;
  resourceUrl: string;
}

class MapItem {

  private regex: string = '';
  private collectionName: string = '';
  private byId: number = 0;

  private match: Array<string>;

  constructor (regex: string,
               collectionName: string,
               byId: number = 0) {
    this.regex = regex;
    this.collectionName = collectionName;
    this.byId = byId;
  }

  test (path: string): boolean {
    const reg = new RegExp(this.regex, 'i');
    const res = reg.test(path);

    if (res) {
      this.match = reg.exec(path);
    }

    return res;
  }

  matches (): Array<string> {
    return this.match;
  }

  getCollectionName () {
    return this.collectionName;
  }

  getId (): number | string {
    return this.byId ? this.match[ this.byId ] : '';
  }
}

@Injectable()
export class InMemoryDataService implements InMemoryDbService {

  private url: UrlStructure = new UrlStructure();

  /**
   * Provide map for the unusual routes
   * @type {[string]}
   */
  private mapper: Array<MapItem> = [
    new MapItem('director\/cases\/import', 'caseImport'),
    new MapItem('director\/cases\/(\\d+)\/services', 'caseServices'),
    new MapItem('director\/cases\/(\\d+)\/diagnostics', 'caseDiagnostics'),
    new MapItem('director\/cases\/(\\d+)\/doctorcase', 'doctorCase', 1),
    new MapItem('director\/cases\/(\\d+)\/hospitalcase', 'hospitalCase', 1),
  ];

  constructor (private _logger: Logger) {
  }

  protected parseUrl (url: string): ParsedUrl {
    try {
      const loc = this.getLocation(url);
      const path = loc.pathname;
      let mapped;

      const pathSegments = path.split('/');
      // default in memory data provider
      this.url.base = pathSegments[ 1 ];
      this.url.query = loc.search && new URLSearchParams(loc.search.substr(1));

      // check mapper for full much
      mapped = this.getFromMapper(path);
      if (mapped) {
        this.url.id = mapped.getId();
        this.url.collectionName = mapped.getCollectionName();
      } else {
        this.url.collectionName = pathSegments[ 2 ];
        this.url.id = pathSegments[ 3 ];
      }
    } catch (err) {
      const msg = 'unable to parse url \'' + url + '\'; error: ' + err;
      this._logger.error(err);
      throw new Error(msg);
    }

    return this.url;
  }

  private getFromMapper (path: string): MapItem | undefined {
    return this.mapper.find((map: MapItem) => {
      return map.test(path);
    });
  }

  private getLocation (href) {
    if (!href.startsWith('http')) {
      // get the document iff running in browser
      const doc = (typeof document === 'undefined') ? undefined : document;
      // add host info to url before parsing.  Use a fake host when not in browser.
      const base = doc ? doc.location.protocol + '//' + doc.location.host : 'http://fake';
      href = href.startsWith('/') ? base + href : base + '/' + href;
    }
    const uri = this.parseUri(href);
    return {
      host: uri.host,
      protocol: uri.protocol,
      port: uri.port,
      pathname: uri.path,
      search: uri.query ? '?' + uri.query : '',
    };
  }

  private parseUri (str): any {
    // tslint:disable-next-line:max-line-length
    const URL_REGEX = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    const key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port',
      'relative', 'path', 'directory', 'file', 'query', 'anchor'];
    const m = URL_REGEX.exec(str);
    const uri = {};
    let i = 14;
    while (i--) {
      uri[ key[ i ] ] = m[ i ] || '';
    }
    return uri;
  }

  createDb () {
    const diagnostics: Diagnostic[] = DiagnosticsDb;
    const categories: DiagnosticCategory[] = DiagnosticCategoriesDb;
    const services: Service[] = ServicesDb;
    const doctors: Doctor[] = DoctorsDb;
    const users: User[] = UsersDb;
    const cities: City[] = CitiesDb;
    const hospitals: Hospital[] = HospitalsDb;
    const types: AccidentType[] = AccidentTypesDb;
    const checkpoints: AccidentCheckpoint[] = AccidentCheckpointsDb;
    const discounts: Discount[] = DiscountsDb;
    const statuses: AccidentStatus[] = AccidentStatusesDb;
    const assistants: Assistant[] = AssistantsDb;
    const patients: Patient[] = PatientsDb;
    const accidents: Accident[] = AccidentsDb;
    const cases: CaseAccident[] = CasesDb;
    const caseServices: Service[] = CaseServicesDb;
    const caseDiagnostics: Diagnostic[] = CaseDiagnosticsDb;
    const doctorCase: DoctorAccident[] = DoctorAccidentDb;
    const hospitalCase: HospitalAccident[] = HospitalAccidentDb;
    const caseImport: Array<any> = CaseImportDb;

    return {
      services,
      diagnostics,
      categories,
      doctors,
      users,
      cities,
      hospitals,
      types,
      checkpoints,
      discounts,
      statuses,
      assistants,
      patients,
      accidents,
      cases,
      caseServices,
      doctorCase,
      hospitalCase,
      caseDiagnostics,
      caseImport,
    };
  }
}
