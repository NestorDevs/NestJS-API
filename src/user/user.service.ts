/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import {
  getRepository,
  Repository,
} from 'typeorm';

@Injectable()
export class UserService {
  // eslint-disable-next-line no-empty-function
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  static getByUsername = (
    username: string
  ) => getRepository(User)
    .createQueryBuilder('user')
    .addSelect([
      'user.id',
      'user.username',
      'user.email',
      'user.firstName',
      'user.lastName',
      'user.phoneNumber',
    ])
    .where('user.username = :username', { username })
    .getOne();
}
