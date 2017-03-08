/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, Output, EventEmitter} from '@angular/core';

import { Category } from './category';
import { CategoryService } from './category.service';

@Component({
    selector: 'diagnostic-category-selector',
    template: `
        <label for="categories">Category</label>
        <select id="categories" class="form-control" name="category" [(ngModel)]="category" (ngModelChange)="onChange($event)">
            <option [ngValue]="_category" *ngFor="let _category of categories">{{ _category.title }}</option>
        </select>
    `
})
export class CategorySelectorComponent {

    category: Category;

    @Input()
    set categoryId(id: number) {
        this.category = this.changeCategory(id);
    }
    @Output() categoryChanged: EventEmitter<number> = new EventEmitter<number>();
    @Output() loading: EventEmitter<any> = new EventEmitter<any>();
    @Output() loaded: EventEmitter<any> = new EventEmitter<any>();

    categories: Category[] = [];

    constructor (
        private service: CategoryService
    ) { }

    ngOnInit(): void {
        this.reloadCategories(this.category);
    }

    changeCategory(id): Category {
        let changed = false;
        _.forEach(this.categories, (cat) => {
            if (id === cat.id) {
                this.category = cat;
                changed = true;
            }
        });

        if (!changed) {
            this.category = new Category(0, '');
        }

        return this.category;
    }

    reloadCategories(category: Category): Category {
        this.loading.emit();
        this.service.getCategories().then((data) => {
            this.categories = data;
            if (!category && this.categories.length) {
                this.category = this.categories[0];
            } else {
                this.category = this.changeCategory(category.id);
            }
            this.loaded.emit();
        });
        return category;
    }

    reloadCategoriesWithCategoryId(id: number): void {
        this.loading.emit();
        this.service.getCategories().then((data) => {
            this.categories = data;
            this.category = this.changeCategory(id);
            this.loaded.emit();
        });
    }

    onChange(): void {
        this.categoryChanged.emit(this.category.id);
    }

}

