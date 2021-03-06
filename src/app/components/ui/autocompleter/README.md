Example:
```angularjs
@Component({
  selector: 'nga-diagnostic-category-select',
  templateUrl: '../../ui/autocompleter/autocompleter.tpl.html',
})
export class DiagnosticCategorySelectComponent extends AbstractAutoCompleteController {
  protected componentName: string = 'DiagnosticCategorySelectComponent';

  constructor(
    private service: DiagnosticCategoryService,
    protected translateService: TranslateService,
  ) {
    super(translateService);
  }

  getService() {
    return this.service;
  }

  getFieldKey(): string {
    return 'title';
  }
}
```

```angular2html
<nga-select-city
                #selectCity
                [isMultiple]="true"
                (selected)="onCitySelect($event)"
                [selectPreloaded]="cities"
            ></nga-select-city>
```
