import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appEllipsis]'
})
export class EllipsisDirective {
  constructor(
    private elementRef: ElementRef
  ) { }

}
