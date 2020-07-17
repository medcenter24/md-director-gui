Usage Example
```
@Component({
  selector: 'nga-diagnostic-datatable',
  templateUrl: './diagnostic.datatable.html',
})
export class DiagnosticDatatableComponent extends AbstractDatatableController {
  protected componentName: string = 'DiagnosticDatatableComponent';

  @ViewChild('diagnosticEditor')
  private diagnosticEditor: DiagnosticEditorComponent;

  constructor (
    protected _logger: LoggerComponent,
    protected _state: GlobalState,
    protected translateService: TranslateService,
    private diagnosticService: DiagnosticService,
  ) {
    super(translateService);
  }

  getService(): LoadableServiceInterface {
    return this.diagnosticService;
  }

  getEmptyModel(): Object {
    return new Diagnostic();
  }

  getColumns(): DatatableCol[] {
    return [
      new DatatableCol('title', this.translateService.instant('Title')),
      new DatatableCol('description', this.translateService.instant('Description')),
      new DatatableCol('diseaseCode', this.translateService.instant('Disease Code')),
    ];
  }

  protected setModel(model: Object = null): void {
    this.model = model;
  }

  getActions(): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Add'), 'fa fa-plus', () => {
        this.setModel(this.getEmptyModel());
        this.displayDialog = true;
      }),
    ];
  }

  getSortBy(): string {
    return 'name';
  }

  closeDiagnosticEditor(): void {
    this.displayDialog = false;
  }

  onDiagnosticChanged(diagnostic: Diagnostic): void {
    if (!this.updateModel(diagnostic)) {
      this.refresh();
    }
    this.setModel(ObjectHelper.clone(diagnostic, this.getEmptyModel()));
    this.displayDialog = false;
  }

  protected hasCaptionPanel (): boolean {
    return true;
  }

  protected getCaptionActions (): DatatableAction[] {
    return [
      new DatatableAction(this.translateService.instant('Show hidden'), 'fa fa-toggle-on', (event) => {
        console.log('here')
      }),
    ];
  }

}
```
