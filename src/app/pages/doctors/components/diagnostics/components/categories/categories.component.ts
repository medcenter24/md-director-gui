/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input} from "@angular/core";

import { Category } from './category';

@Component({
    selector: 'categories-editor',
    styleUrls: ['./categories.scss'],
    templateUrl: './categories.html'
})
export class CategoriesComponent {

    @Input() category: Category;

    constructor () {
        this.setEmptyCategory();
    };

    onSubmit(): void {
        console.log(this.category);
    }

    onCategoryChange(category): void {
        this.category = category;
    }

    onCreateCategory(): void {
        this.setEmptyCategory();
    }

    private setEmptyCategory(): void {
        this.category = new Category(0, '');
    }
}
