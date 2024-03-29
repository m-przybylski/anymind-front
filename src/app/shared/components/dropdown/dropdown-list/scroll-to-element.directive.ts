import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';
import { Config } from '@anymind-ng/core';

@Directive({
  selector: '[scrollToElementDirective]',
})
export class ScrollToElementDirective {
  @Output()
  public onEnter = new EventEmitter<void>();

  @Output()
  public onKeyUp = new EventEmitter<void>();

  @Output()
  public onKeyDown = new EventEmitter<void>();

  constructor(private element: ElementRef) {}

  @HostListener('document:keydown', ['$event'])
  public onKeydownHandler = (event: KeyboardEvent): void => {
    switch (event.key) {
      case Config.keyboardCodes.arrowUp:
        this.onKeyUp.emit();

        return;

      case Config.keyboardCodes.arrowDown:
        this.onKeyDown.emit();

        return;

      case Config.keyboardCodes.enter:
        this.onEnter.emit();

        return;

      default:
        return;
    }
  };

  public scrollToElement = (index: number): void =>
    this.element.nativeElement
      .querySelector(`#item_${index}`)
      .scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
}
