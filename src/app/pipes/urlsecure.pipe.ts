import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'urlsecure'
})
export class UrlsecurePipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null): SafeResourceUrl | null {
    if (!value) {
      return null;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}
