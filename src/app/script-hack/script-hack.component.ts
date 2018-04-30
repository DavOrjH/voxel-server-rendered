import { Component, ElementRef, ViewChild, Input } from '@angular/core';

@Component({
    selector: 'my-script',
    templateUrl: './script-hack.component.html'
})
export class ScriptHackComponent {

    @Input() src: string;
    @Input() id: string;
    @Input() type: string;

    @ViewChild('script') script: ElementRef;

    convertToScript() {
        let element = this.script.nativeElement;
        let script = document.createElement("script");
        script.type = this.type ? this.type : "text/javascript";
        script.id = this.id;
        if (this.src) {
            script.src = this.src;
        }
        if (element.innerHTML) {
            script.innerHTML = element.innerHTML;
        }
        let parent = element.parentElement;
        parent.parentElement.replaceChild(script, parent);
    }

    ngAfterViewInit() {
        this.convertToScript();
    }
}
