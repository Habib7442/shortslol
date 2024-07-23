export class StringService {
  static toPascalCase(text: string): string {
    return text
      .toLowerCase()
      .split(' ')
      .map((word) => word[0].toUpperCase().concat(word.slice(1)))
      .join('');
  }

  static toPlural(count: number, str: string, plural = 's'): string {
    return count > 1 || count == 0 ? str + plural : str;
  }

  static shorten(str: string, len: number): string {
    return str.length > len ? str.slice(0, len) + '...' : str;
  }
}
