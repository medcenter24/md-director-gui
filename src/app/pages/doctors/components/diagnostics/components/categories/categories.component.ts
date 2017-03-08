/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import {Component, Input, ViewChild, Output, EventEmitter} from "@angular/core";

import { Category } from './category';
import {CategoryService} from "./category.service";
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import {CategorySelectorComponent} from "./selector.component";

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

    @Output() changedCategories: EventEmitter<null> = new EventEmitter<null>();

    @ViewChild(CategorySelectorComponent)
    private categorySelectorComponent: CategorySelectorComponent;

    constructor (
        private service: CategoryService,
        private slimLoadingBarService: SlimLoadingBarService
    ) {};

    ngOnInit(): void {
        this.setEmptyCategory();
    }

    onSubmit(): void {
        this.slimLoadingBarService.reset();
        this.slimLoadingBarService.start();

        if (this.category.id) {
            this.service.update(this.category).then((category: Category) => {
                this.slimLoadingBarService.complete();
                this.category = this.categorySelectorComponent.reloadCategories(category);
                this.changedCategories.emit();
            });
        } else {
            this.service.create(this.category.title).then((category: Category) => {
                this.slimLoadingBarService.complete();
                this.category = this.categorySelectorComponent.reloadCategories(category);
                this.changedCategories.emit();
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
