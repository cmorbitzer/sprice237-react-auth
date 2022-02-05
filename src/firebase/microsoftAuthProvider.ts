import { OAuthProvider } from '@firebase/auth';

export class MicrosoftAuthProvider extends OAuthProvider {
  constructor() {
    super('microsoft.com');
  }
}
