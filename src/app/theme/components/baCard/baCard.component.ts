import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'ba-card',
  templateUrl: './baCard.html',
})
export class BaCard {
  @Input() closeable: boolean = false;
  @Input() title: String;
  @Input() baCardClass: String;
  @Input() cardType: String;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  closeCard (): void {
    this.close.emit(true);
  }
}
