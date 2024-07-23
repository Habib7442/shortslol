export class NumberService {
  static addCommas(num: number): string {
    return num.toLocaleString('en-US');
  }
}
