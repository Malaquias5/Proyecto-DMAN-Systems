import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true,
  pure: false,
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (seconds < 0) return 'ahora';
    if (seconds < 60) return 'hace unos segundos';

    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `hace ${minutes} min`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `hace ${hours} h`;

    const days = Math.floor(hours / 24);
    if (days < 7) return days === 1 ? 'ayer' : `hace ${days} días`;

    if (days < 30) {
      const weeks = Math.floor(days / 7);
      return weeks === 1 ? 'hace 1 semana' : `hace ${weeks} semanas`;
    }

    if (days < 365) {
      const months = Math.floor(days / 30);
      return months === 1 ? 'hace 1 mes' : `hace ${months} meses`;
    }

    const years = Math.floor(days / 365);
    return years === 1 ? 'hace 1 año' : `hace ${years} años`;
  }
}
