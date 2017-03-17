/*
 * Copyright (c) 2017.
 *
 * @author Alexander Zagovorichev <zagovorichev@gmail.com>
 */


import {DiagnosticCategory} from "../../../../components/diagnostic/category/category";
export const DiagnosticCategoriesDb: DiagnosticCategory[] = [
    {id: 1, title: 'Foreign bodies'},
    {id: 2, title: 'ENT, respiratory'},
    {id: 3, title: 'Eye'},
    {id: 4, title: 'Skin'},
    {id: 5, title: 'Allergy'},
    {id: 6, title: 'Genitourinary'},
    {id: 7, title: 'Teeth, mouth'}
].map(x => new DiagnosticCategory(x.id, x.title));
