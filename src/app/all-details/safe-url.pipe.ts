import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
   name: 'safeUrl'
   })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  // transform(url: string): SafeResourceUrl {
  //   return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  // }

  transform(url: SafeResourceUrl | null): string | null {
    return url ? this.sanitizer.sanitize(0, url.toString()) || '' : null;
  }
}
