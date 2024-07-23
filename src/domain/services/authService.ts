import { NextRouter } from 'next/router';

export class AuthService {
  static sendToRegister(router: NextRouter, email?: string): void {
    const url =
      email != null
        ? `/register?email=${encodeURIComponent(email)}`
        : '/register';
    router.push(url);
  }

  static sendToLogin(router: NextRouter): void {
    router.push('/login');
  }
}
