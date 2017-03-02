/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Category } from './category';

@Injectable()
export class CategoryService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private categoryUrl = 'director/diagnostic/categories';  // URL to web api

    CategoriesData = [{
        id: 1,
        title: 'Category 1',
    },{
        id: 2,
        title: 'Category 2',
    }];

    constructor(private http: Http) { }

    getCategories(): Promise<Category[]> {

        if (ENV === 'production') {
            return this.http.get(this.categoryUrl)
                .toPromise()
                .then(response => response.json().data as Category[])
                .catch(this.handleError);
        } else {
            return new Promise((resolve, reject) => {
                resolve(this.CategoriesData as Category[]);
            });
        }
    }


    getCategory(id: number): Promise<Category> {
        const url = `${this.categoryUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Category)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.categoryUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    create(title: string): Promise<Category> {
        return this.http
            .post(this.categoryUrl, JSON.stringify({title: title}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(category: Category): Promise<Category> {
        const url = `${this.categoryUrl}/${category.id}`;
        return this.http
            .put(url, JSON.stringify(category), {headers: this.headers})
            .toPromise()
            .then(() => category)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}

