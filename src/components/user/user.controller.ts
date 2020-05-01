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
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { QueryDTO } from './dto/query.dto';
import { UpdateDTO } from './dto/update.dto';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@ApiTags('users')
@Controller('users')
export class UserController {
  // eslint-disable-next-line no-empty-function
  constructor(private userService: UserService) {}

  @ApiOkResponse({ description: 'List all users' })
  @Get('')
  async getUsersList(
    @Query() query: QueryDTO,
    @Res() res: Response
  ) {
    return this.userService.getUsersList(
      query.page,
      query.limit,
      query.search,
      query.sort,
      query.order
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
    @Body() body: UpdateDTO,
    @Param('id') id
  ) {
    return this.userService.updateUser(
      id,
      body.email,
      body.firstName,
      body.lastName
    );
  }
}
