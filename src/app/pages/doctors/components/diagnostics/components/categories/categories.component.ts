/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, ViewChild, Output, EventEmitter} from "@angular/core";

import { Category } from './category';
import {CategoryService} from "./category.service";
import {SlimLoadingBarComponent} from 'ng2-slim-loading-bar';
import {CategorySelectorComponent} from "./selector.component";

@Component({
    selector: 'categories-editor',
    templateUrl: './categories.html'
})
export class CategoriesComponent {

    category: Category;

    @Input()
    set categoryId(id: number) {
        this.loadCategory(id);
    }

    @Output() changedCategories: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild(CategorySelectorComponent)
        private categorySelectorComponent: CategorySelectorComponent;

    @ViewChild('loadingBarCategories')
        private loadingBar: SlimLoadingBarComponent;

    constructor (private service: CategoryService) {};

    ngOnInit(): void {
        this.setEmptyCategory();
    }

    startLoading(): void {
        this.loadingBar.color = '#209e91';
        this.loadingBar.show = true;
        this.loadingBar.service.reset();
        this.loadingBar.service.start();
    }

    completeLoading(): void {
        this.loadingBar.service.complete();
        this.loadingBar.show = false;
    }

    errorLoading(): void {
        this.loadingBar.color = '#f89711';
    }

    onSubmit(): void {
        this.startLoading();

        if (this.category.id) {
            this.service.update(this.category).then((category: Category) => {
                this.completeLoading();
                this.category = this.categorySelectorComponent.reloadCategories(category);
                this.changedCategories.emit();
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
            });
        } else {
            this.service.create(this.category.title).then((category: Category) => {
                this.completeLoading();
                this.category = this.categorySelectorComponent.reloadCategories(category);
                this.changedCategories.emit();
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
            });
        }
    }

    onCategoryChange(categoryId): void {
        this.loadCategory(categoryId);
    }

    onCreateCategory(): void {
        this.setEmptyCategory();
    }

    onSelectorLoaded(): void {
        this.completeLoading();
    }

    onSelectorLoading(): void {
        this.startLoading();
    }

    private setEmptyCategory(): void {
        this.category = new Category(0, '');
    }

    private loadCategory(id: number): void {
        if (id) {
            this.startLoading();
            this.service.getCategory(id).then((category) => {
                this.category = category;
                this.completeLoading();
            }).catch(() => {
                this.errorLoading();
                this.completeLoading();
            });
        }
    }
}
