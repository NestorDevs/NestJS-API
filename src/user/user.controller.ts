/* eslint-disable no-useless-constructor */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiOkResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Controller('users')
export class UserController {
  // eslint-disable-next-line no-empty-function
  constructor(private userService: UserService) {}

  @ApiOkResponse({ description: 'List all users' })
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
    ).then((users) => res.status(200).json({
      data: {
        ...users,
      },
      status: true,
    }));
  }

  @Get('/:username')
  async getByUsername(
    @Param('username') username,
    @Res() res: Response
  ) {
    return this.userService.getByUsername(
      username
    ).then((user) => res.status(200).json({
      data: {
        ...user,
      },
      status: true,
    }));
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id);
  }

  @Patch('/:id')
  async updateUser(
    @Body('email') email,
    @Param('id') id
  ) {
    return this.userService.updateUser(id, email);
  }
}
