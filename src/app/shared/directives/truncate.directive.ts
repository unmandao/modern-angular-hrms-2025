import { AfterViewInit, Directive, ElementRef, Input, inject } from '@angular/core';

@Directive({
    selector: '[appTruncate]'
})
export class TruncateDirective implements AfterViewInit {
    @Input() limit = 80;
    private readonly elRef = inject(ElementRef);

    ngAfterViewInit() {
        this.elRef.nativeElement.textContent = this.elRef.nativeElement.textContent.slice(
            0, 
            this.limit,
        );
    }
}