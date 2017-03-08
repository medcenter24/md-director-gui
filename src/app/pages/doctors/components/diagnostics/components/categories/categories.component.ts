/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input} from "@angular/core";

import { Category } from './category';
import {CategoryService} from "./category.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

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
        private service: CategoryService,
        private slimLoadingBarService: SlimLoadingBarService
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

    onSelectorLoaded(): void {
        this.slimLoadingBarService.complete();
    }

    onSelectorLoading(): void {
        this.slimLoadingBarService.reset();
        this.slimLoadingBarService.start();
    }

    private setEmptyCategory(): void {
        this.category = new Category(0, '');
    }

    private loadCategory(id: number): void {
        if (id) {
            this.slimLoadingBarService.reset();
            this.slimLoadingBarService.start();
            this.service.getCategory(id).then((category) => {
                this.category = category;
                this.slimLoadingBarService.complete();
            });
        }
    }
}
