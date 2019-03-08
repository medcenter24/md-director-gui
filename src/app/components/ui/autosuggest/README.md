# Auto suggest for Angular 6

Template to use
```
<nga-auto-complete
  #autocompleter
  *ngIf="langLoaded"
  [config]="autoCompleteConfig"
  (changed)="onChanged($event)"
></nga-auto-complete>
```

- **langLoaded** used to determine when translations were loaded and content may be shown
- **config** Configuration:
  - `src/auto.complete.src.config.ts`
    - ***dataProvider*** - method which returns data from backend or any other storage
  - **minLength** minimum characters that needed for search
  - **rows** - count of loadable rows (if 0 then autoCompleter cache data and do not load any more)
  - **placeholder** - placeholder for the empty selector
  - **fieldKey** - field to use it in selector (column name)
  - **provider** - Type of the data provider
                        ("static" - all data loaded at once to the memory; 
                        "loadable" - request to the server on each action)
  - **isMultiple** - Type of auto suggest (single or multiple choice)
  - **preloaded** - Data which will be selected on component init
- **changed** - Fired with selected objects
