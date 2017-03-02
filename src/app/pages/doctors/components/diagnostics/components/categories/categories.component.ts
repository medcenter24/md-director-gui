/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input} from "@angular/core";

import { Category } from './category';

@Component({
    selector: 'categories-editor',
    templateUrl: './categories.html'
})
export class CategoriesComponent {

    @Input() category: Category;

    constructor () {};

    onSubmit(): void {
        console.log(this.category);
    }

    onCategoryChange(category): void {
        console.log(category);
    }
}
