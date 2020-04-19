import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  private mockUser = {
    bio: 'JS developer',
    email: 'kontakt@egocentryk.pl',
    id: 1,
    image: null,
    username: 'egocentryk',
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(credentials: RegisterDTO) {
    return this.mockUser;
  }

  login(credentials: LoginDTO) {
    if (credentials.email === this.mockUser.email) {
      return this.mockUser;
    }

    throw new InternalServerErrorException();
  }
}
