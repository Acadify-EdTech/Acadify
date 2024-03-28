import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'sanitizeHtml',
    standalone: true,
})
export class SanitizeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(value: any): SafeHtml {
        if (typeof document === 'undefined') {
            return value;
        }
        const div = document.createElement('div');
        div.innerHTML = value;
        const codeBlocks = div.getElementsByClassName('code');
        for (let i = 0; i < codeBlocks.length; i++) {
            const codeBlock = codeBlocks[i];
            codeBlock.innerHTML = codeBlock.innerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        return this.sanitizer.bypassSecurityTrustHtml(div.innerHTML);
    }
}