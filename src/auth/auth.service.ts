/* eslint-disable no-empty-function */
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(User) private user:Repository<User>
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async register(credentials: RegisterDTO) {
    try {
      const user = this.user.create(credentials);

      await user.save();

      return user;
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('Username has already been taken');
      }

      throw new InternalServerErrorException();
    }
  }

  async login({
    email,
    password,
  }: LoginDTO) {
    try {
      const user = await this.user.findOne({
        where: {
          email,
        },
      });

      const isValid = user.compare(password);

      if (user && !isValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
