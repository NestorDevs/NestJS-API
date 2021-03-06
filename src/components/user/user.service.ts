/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getRepository,
  Repository,
} from 'typeorm';
import {
  User,
  UserRole,
  UserStatus,
} from '../../entities/User.entity';
import { UsersList } from './user.interface';
import Helpers from '../../utils/helpers';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Injectable()
export class UserService {
  // eslint-disable-next-line no-empty-function
  constructor(@InjectRepository(User) private user: Repository<User>) {}

  getUsersList = async (
    page = 1,
    limit = 10,
    search = '',
    sort = 'id',
    order = Order.DESC
  ): Promise<UsersList> => {
    const offset = (page - 1) * limit;

    const usersCount = await getRepository(User)
      .createQueryBuilder('user')
      .where('LOWER(user.email) LIKE :search', { search: `%${search}%` })
      .getCount();

    const usersList = await getRepository(User)
      .createQueryBuilder('user')
      .addSelect([
        'user.id',
        'user.username',
        'user.email',
        'user.isBlocked',
        'user.createdAt',
        'user.updatedAt',
      ])
      .where('LOWER(user.email) LIKE :search', { search: `%${search}%` })
      .skip(offset)
      .take(limit)
      .orderBy(`user.${sort}`, order)
      .getMany();

    const pages = Helpers.calculatePages(usersCount, limit);

    return {
      list: usersList,
      page,
      pages,
      totalCount: usersCount,
    };
  }

  getByUsername = (
    username: string
  ): Promise<User> => getRepository(User)
    .createQueryBuilder('user')
    .select([
      'user.id',
      'user.username',
      'user.email',
      'user.isBlocked',
      'user.createdAt',
      'user.updatedAt',
    ])
    .where('user.username = :username', { username })
    .getOne();

  deleteUser = (
    id: string
  ) => getRepository(User)
    .createQueryBuilder('user')
    .delete()
    .from(User)
    .where('id = :id', { id })
    .execute();

  updateUser = (
    id: string,
    email: string,
    firstName: string,
    lastName: string
  ) => getRepository(User)
    .createQueryBuilder('user')
    .update(User)
    .set({
      email,
      firstName,
      lastName,
    })
    .where('id = :id', { id })
    .execute();

  isUserBlocked = async (
    id: string
  ) => {
    const user: User = await getRepository(User)
      .createQueryBuilder('user')
      .select(['user.isBlocked'])
      .where('id = :id', { id })
      .execute();

    return user.isBlocked;
  }

  blockUser = async (
    id: string
  ) => {
    await getRepository(User)
      .createQueryBuilder('user')
      .update(User)
      .set({
        isBlocked: true,
      })
      .where('id = :id', { id })
      .execute();
  }

  setUserStatus = async (
    id: string,
    status: UserStatus
  ) => {
    await getRepository(User)
      .createQueryBuilder('user')
      .update(User)
      .set({
        status,
      })
      .where('id = :id', { id })
      .execute();
  }

  setUserRole = async (
    id: string,
    role: UserRole
  ) => {
    await getRepository(User)
      .createQueryBuilder('user')
      .update(User)
      .set({
        role,
      })
      .where('id = :id', { id })
      .execute();
  }
}
