/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */

import { Category } from "../components/categories/category";

export const CategoriesDb: Category[] = [
    {id: 1, title: 'Foreign bodies'},
    {id: 2, title: 'ENT, respiratory'},
    {id: 3, title: 'Eye'},
    {id: 4, title: 'Skin'},
    {id: 5, title: 'Allergy'},
    {id: 6, title: 'Genitourinary'},
    {id: 7, title: 'Teeth, mouth'}
].map(x => new Category(x.id, x.title));
