/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable, Injector } from '@angular/core';

import {
  InMemoryDbService,
  ParsedUrl
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
import { AccidentDiscount } from '../components/accident/components/discount/discount';
import { AccidentDiscountsDb } from './accidentDiscounts.db';
import { URLSearchParams } from '@angular/http';
import { Logger } from 'angular2-logger/core';
import { CaseServicesDb } from './CaseServicesDb.db';
import { DoctorAccident } from '../components/doctorAccident/doctorAccident';
import { DoctorAccidentDb } from './doctorAccident.db';
import { HospitalAccident } from '../components/hospitalAccident/hospitalAccident';
import { HospitalAccidentDb } from './hospitalAccident.db';

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
    let reg = new RegExp(this.regex, 'i');
    let res = reg.test(path);

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

  private url: UrlStructure = new UrlStructure;

  /**
   * Provide map for the unusual routes
   * @type {[string]}
   */
  private mapper: Array<MapItem> = [
    new MapItem('director\/cases\/(\\d+)\/services', 'caseServices'),
    new MapItem('director\/cases\/(\\d+)\/doctorcase', 'doctorCase', 1),
    new MapItem('director\/cases\/(\\d+)\/hospitalcase', 'hospitalCase', 1),
  ];

  constructor (private _logger: Logger) {
  }

  protected parseUrl (url: string): ParsedUrl {
    try {
      let loc = this.getLocation(url);
      let path = loc.pathname;
      let mapped;

      let pathSegments = path.split('/');
      // default in memory data provider
      this.url.base = pathSegments[ 1 ];
      this.url.query = loc.search && new URLSearchParams(loc.search.substr(1));

      // check mapper for full much
      if (mapped = this.getFromMapper(path)) {
        this.url.id = mapped.getId();
        this.url.collectionName = mapped.getCollectionName();
      } else {
        this.url.collectionName = pathSegments[ 2 ];
        this.url.id = pathSegments[ 3 ];
      }
    } catch (err) {
      let msg = 'unable to parse url \'' + url + '\'; error: ' + err;
      this._logger.error(err);
      throw new Error(msg);
    }

    return this.url;
  };

  private getFromMapper (path: string): MapItem | undefined {
    return this.mapper.find((map: MapItem) => {
      return map.test(path);
    });
  }

  private getLocation (href) {
    if (!href.startsWith('http')) {
      // get the document iff running in browser
      let doc = (typeof document === 'undefined') ? undefined : document;
      // add host info to url before parsing.  Use a fake host when not in browser.
      let base = doc ? doc.location.protocol + '//' + doc.location.host : 'http://fake';
      href = href.startsWith('/') ? base + href : base + '/' + href;
    }
    let uri = this.parseUri(href);
    return {
      host: uri.host,
      protocol: uri.protocol,
      port: uri.port,
      pathname: uri.path,
      search: uri.query ? '?' + uri.query : ''
    };
  }

  private parseUri (str): any {
    // tslint:disable-next-line:max-line-length
    var URL_REGEX = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
    var key = [ 'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port',
      'relative', 'path', 'directory', 'file', 'query', 'anchor' ];
    var m = URL_REGEX.exec(str);
    var uri = {};
    var i = 14;
    while (i--) {
      uri[ key[ i ] ] = m[ i ] || '';
    }
    return uri;
  }

  createDb () {
    let diagnostics: Diagnostic[] = DiagnosticsDb;
    let categories: DiagnosticCategory[] = DiagnosticCategoriesDb;
    let services: Service[] = ServicesDb;
    let doctors: Doctor[] = DoctorsDb;
    let users: User[] = UsersDb;
    let cities: City[] = CitiesDb;
    let hospitals: Hospital[] = HospitalsDb;
    let types: AccidentType[] = AccidentTypesDb;
    let checkpoints: AccidentCheckpoint[] = AccidentCheckpointsDb;
    let discounts: AccidentDiscount[] = AccidentDiscountsDb;
    let statuses: AccidentStatus[] = AccidentStatusesDb;
    let assistants: Assistant[] = AssistantsDb;
    let patients: Patient[] = PatientsDb;
    let accidents: Accident[] = AccidentsDb;
    let cases: CaseAccident[] = CasesDb;
    let caseServices: Service[] = CaseServicesDb;
    let doctorCase: DoctorAccident[] = DoctorAccidentDb;
    let hospitalCase: HospitalAccident[] = HospitalAccidentDb;

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
    };
  }
}
