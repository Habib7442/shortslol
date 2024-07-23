export class UrlService {
  static addHttps = (url: string): string => {
    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }
    return url;
  };
}
