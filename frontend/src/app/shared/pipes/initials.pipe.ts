import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials',
  standalone: true,
})
export class InitialsPipe implements PipeTransform {
  transform(value: string | null | undefined, max = 2): string {
    if (!value) return '?';
    return value
      .trim()
      .split(/\s+/)
      .slice(0, max)
      .map(w => w.charAt(0).toUpperCase())
      .join('');
  }
}
