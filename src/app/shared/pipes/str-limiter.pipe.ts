import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'strLimiter'
})
export class StrLimiterPipe implements PipeTransform {

  transform(
    value: string | null | undefined,
    limit: number = 10,
    suffix: string = '..',
  ): string {
    if (!value) return '';
    if (limit <= 0) return value.toString();
    if (value.length <= limit) return value.toString();

    const regex = new RegExp(`^.{0,${limit}}(?=[\\s.,;:!?]|$)`, 'u');
    const match = value.match(regex);

    if (match && match[0].length > 0) {
      if (match[0].charAt(match[0].length - 1) === '.') {
        return match[0].replace(/\.$/u, '..');
      } else {
        return match[0] + suffix;
      }
    }

    return value.substring(0, limit) + suffix;
  }
}
