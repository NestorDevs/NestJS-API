import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  private mockUser = {
    bio: 'JS developer',
    email: 'kontakt@egocentryk.pl',
    id: 1,
    image: null,
    username: 'egocentryk',
  }

  register() {
    return this.mockUser;
  }

  login(credentials: any) {
    if (credentials.email === this.mockUser.email) {
      return this.mockUser;
    }

    throw new InternalServerErrorException();
  }
}
