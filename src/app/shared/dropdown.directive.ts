import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isOpen: boolean = false;

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
    let ul = this.el.nativeElement.querySelector('ul.dropdown-menu');
    this.isOpen ? this.renderer.addClass(ul, 'show') : this.renderer.removeClass(ul, 'show');
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

}
