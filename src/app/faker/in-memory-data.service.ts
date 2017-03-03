/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 *
 * That I need for make easy development (development without real API server)
 */

import {Injectable} from "@angular/core";

import {URLSearchParams, ResponseOptions, RequestMethod, Response} from "@angular/http";
import {Observer, Observable} from "rxjs";

import {
    InMemoryDbService, ParsedUrl, RequestInfo, HttpMethodInterceptorArgs, STATUS,
    createErrorResponse, emitResponse
} from 'angular-in-memory-web-api';

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let diagnostics = [
            {id: 1, title: 'Sore throat', description: 'When throat is red'},
            {id: 2, title: 'Jellyfish sting', description: 'Sometimes they could be really dangerous'},
            {id: 3, title: 'Broke leg', description: 'Broke bone'},
            {id: 4, title: 'Broke hand', description: 'Broke bone'},
            {id: 5, title: 'Broke head', description: 'Broke bone'},
            {id: 6, title: 'Broke finger', description: 'Broke bone'},
            {id: 7, title: 'Broke arm', description: 'Broke bone'},
            {id: 8, title: 'Red eye', description: 'Maybe too many sun'},
            {id: 9, title: 'Temperature', description: 'It could be useful'},
            {id: 10, title: 'Something stuck in the throat', description: 'What could it be?'},
            {id: 11, title: 'Eleventh option', description: 'Diagnostic with that option'}
        ];
        return {'director/diagnostics': diagnostics};
    }
}

/**
 * This is an example of a Hero-oriented InMemoryDbService with method overrides.
 */
@Injectable()
export class InMemoryDataOverrideService extends InMemoryDataService {
    // parseUrl override
    parseUrl(url: string): ParsedUrl {
        try {
            const loc = this.getLocation(url);
            let drop = 0;
            let urlRoot = '';
            if (loc.host !== undefined) {
                // url for a server on a different host!
                // assume it's collection is actually here too.
                drop = 1; // the leading slash
                urlRoot = loc.protocol + '//' + loc.host + '/';
            }
            const path = loc.pathname.substring(drop);
            let [base, collectionName, id] = path.split('/');
            const resourceUrl = urlRoot + base + '/' + collectionName + '/';
            [collectionName] = collectionName.split('.'); // ignore anything after the '.', e.g., '.json'
            const query = loc.search && new URLSearchParams(loc.search.substr(1));

            const result = { base, collectionName, id, query, resourceUrl };
            console.log('override parseUrl:');
            console.log(result);
            return result;
        } catch (err) {
            const msg = `unable to parse url '${url}'; original error: ${err.message}`;
            throw new Error(msg);
        }
    }

    // intercept response from the default HTTP method handlers
    responseInterceptor(response: ResponseOptions, reqInfo: RequestInfo) {
        const method = RequestMethod[reqInfo.req.method].toUpperCase();
        const body = JSON.stringify(response.body);
        console.log(`responseInterceptor: ${method} ${reqInfo.req.url}: \n${body}`);
        return response;
    }

    // HTTP GET interceptor
    protected get(interceptorArgs: HttpMethodInterceptorArgs) {
        // Returns a "cold" observable that won't be executed until something subscribes.
        return new Observable<Response>((responseObserver: Observer<Response>) => {
            console.log('HTTP GET override');
            let resOptions: ResponseOptions;

            const {id, query, collection, collectionName, headers, req} = interceptorArgs.requestInfo;
            let data = collection;

            if (id) {
                data = this.findById(collection, id);
            } else if (query) {
                data = this.applyQuery(collection, query);
            }

            if (data) {
                resOptions = new ResponseOptions({
                    body: { data: this.clone(data) },
                    headers: headers,
                    status: STATUS.OK
                });
            } else {
                resOptions = createErrorResponse(req, STATUS.NOT_FOUND,
                    `'${collectionName}' with id='${id}' not found`);
            }

            emitResponse(responseObserver, req, resOptions);
            return () => { }; // unsubscribe function
        });
    }

    /////////// private ///////////////
    private applyQuery(collection: any[], query: URLSearchParams) {
        // extract filtering conditions - {propertyName, RegExps) - from query/search parameters
        const conditions: {name: string, rx: RegExp}[] = [];
        const caseSensitive = 'i';
        query.paramsMap.forEach((value: string[], name: string) => {
            value.forEach(v => conditions.push({name, rx: new RegExp(decodeURI(v), caseSensitive)}));
        });

        const len = conditions.length;
        if (!len) { return collection; }

        // AND the RegExp conditions
        return collection.filter(row => {
            let ok = true;
            let i = len;
            while (ok && i) {
                i -= 1;
                const cond = conditions[i];
                ok = cond.rx.test(row[cond.name]);
            }
            return ok;
        });
    }

    private clone(data: any) {
        return JSON.parse(JSON.stringify(data));
    }

    private findById(collection: any[], id: number | string) {
        return collection.find((item: any) => item.id === id);
    }

    private getLocation(href: string) {
        const l = document.createElement('a');
        l.href = href;
        return l;
    };
}
