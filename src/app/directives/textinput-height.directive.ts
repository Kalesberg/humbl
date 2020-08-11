import { Directive, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: "[appTextInputHeight]"
})

export class TextInputHeightDirective {

    @HostListener('ionChange') onMouseEnter() {
        this.changeHeight();
    }

    public firstlineHeight: any
    public maxlineHeight: any
    public firstLoad = false


    constructor(private element: ElementRef) { }

    changeHeight() {

        if (!this.firstLoad) {
            this.firstlineHeight = this.element.nativeElement.children[0].scrollHeight
            this.maxlineHeight = this.firstlineHeight * 3
            this.element.nativeElement.children[0].style.height = this.firstlineHeight + 'px';
            this.element.nativeElement.style.height = this.firstlineHeight + 'px';
            this.firstLoad = true;
        }

        if (this.element.nativeElement.children[0].value) {

            this.element.nativeElement.children[0].style.overflow = 'scroll';
            this.element.nativeElement.children[0].style.height = 'auto';

            if (this.maxlineHeight >= this.element.nativeElement.children[0].scrollHeight) {
                this.element.nativeElement.children[0].style.height = this.element.nativeElement.children[0].scrollHeight + 'px';
                this.element.nativeElement.style.height = this.element.nativeElement.children[0].scrollHeight + 'px';
            }
            else {
                this.element.nativeElement.children[0].style.height = this.maxlineHeight + 'px';
                this.element.nativeElement.style.height = this.maxlineHeight + 'px';
            }
        }
        else {
            this.element.nativeElement.children[0].style.height = this.firstlineHeight + 'px';
            this.element.nativeElement.style.height = this.firstlineHeight + 'px';
        }

    }

}
