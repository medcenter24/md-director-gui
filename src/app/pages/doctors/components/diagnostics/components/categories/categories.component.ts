/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input} from "@angular/core";

import { Category } from './category';
import {CategoryService} from "./category.service";

@Component({
    selector: 'categories-editor',
    styleUrls: ['./categories.scss'],
    templateUrl: './categories.html'
})
export class CategoriesComponent {

    category: Category;

    @Input()
    set categoryId(id: number) {
        this.loadCategory(id);
    }

    constructor (
        private service: CategoryService
    ) {};

    ngOnInit(): void {
        this.setEmptyCategory();
    }

    onSubmit(): void {
        console.log(this.category);
    }

    onCategoryChange(categoryId): void {
        this.loadCategory(categoryId);
    }

    onCreateCategory(): void {
        this.setEmptyCategory();
    }

    private setEmptyCategory(): void {
        this.category = new Category(0, '');
    }

    private loadCategory(id: number): void {
        if (id) {
            this.service.getCategory(id).then(category => this.category = category);
        }
    }
}
