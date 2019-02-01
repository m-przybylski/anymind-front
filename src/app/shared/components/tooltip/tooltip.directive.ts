import { Directive, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { TooltipService } from '@platform/shared/components/tooltip/tooltip.service';

export interface ITooltipModalOffsets {
  modalRelative: {
    offsetLeft: number;
    offsetTop: number;
  };
  bodyRelative: ClientRect | DOMRect;
}

@Directive({
  selector: '[tooltipPositionDirective]',
})
export class TooltipDirective implements OnInit {
  @Output()
  public onClick = new EventEmitter<boolean>();

  @Input()
  public tooltipHeader: HTMLElement;

  private isVisible = false;
  private tooltipOffset: ITooltipModalOffsets;

  constructor(private element: ElementRef, private tooltipService: TooltipService) {}

  @HostListener('document:click', ['$event'])
  public handleClick(event: Event): void {
    if (!this.element.nativeElement.contains(event.target)) {
      this.isVisible = false;
      this.onClick.emit(this.isVisible);
    }
  }

  public ngOnInit(): void {
    this.handleTooltipHeader();
  }

  private handleTooltipHeader = (): void => {
    this.tooltipHeader.addEventListener('click', () => {
      this.isVisible = !this.isVisible;
      this.onClick.emit(this.isVisible);

      this.mapTooltipOffsetValues();

      this.tooltipService.pushTooltipPosition(this.tooltipOffset);
    });
  };

  private mapTooltipOffsetValues = (): void => {
    const tooltipBodyRelativeOffsets = this.element.nativeElement.getBoundingClientRect();

    this.tooltipOffset = {
      modalRelative: {
        offsetLeft: this.element.nativeElement.offsetLeft,
        offsetTop: this.element.nativeElement.offsetTop,
      },
      bodyRelative: tooltipBodyRelativeOffsets,
    };
  };
}
