/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getRepository,
  Repository,
} from 'typeorm';
import { User } from '../entities/User.entity';

@Injectable()
export class UserService {
  // eslint-disable-next-line no-empty-function
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  getByUsername = (
    username: string
  ) => getRepository(User)
    .createQueryBuilder('user')
    .select([
      'user.id',
      'user.username',
      'user.email',
      'user.isActive',
      'user.isBlocked',
      'user.createdAt',
      'user.updatedAt',
    ])
    .where('user.username = :username', { username })
    .getOne();
}
