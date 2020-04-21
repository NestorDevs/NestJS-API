/* eslint-disable no-useless-constructor */
import {
  Controller,
  Get,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { User } from '../entities/User.entity';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Controller('users')
export class UserController {
  // eslint-disable-next-line no-empty-function
  constructor(private userService: UserService) {}

  @Get('')
  async getUsersList(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('search') search: string = '',
    @Query('sort') sort: string = 'id',
    @Query('order') order: Order.DESC,
    @Res() res: Response
  ) {
    return this.userService.getUsersList(
      page,
      limit,
      search,
      sort,
      order
    ).then((users) => res.status(200).json(users));
  }

  @Get('/:username')
  async getByUsername(@Param('username') username): Promise<User> {
    return this.userService.getByUsername(username);
  }
}
