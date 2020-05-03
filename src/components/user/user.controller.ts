/* eslint-disable no-useless-constructor */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { QueryDTO } from './dto/query.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

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
    @Query() query: QueryDTO
  ) {
    const users = await this.userService.getUsersList(
      query.page,
      query.limit,
      query.search,
      query.sort,
      query.order
    );

    return {
      data: {
        ...users,
      },
      status: true,
    };
  }

  @Get('/:username')
  async getByUsername(
    @Param('username') username
  ) {
    const user = await this.userService.getByUsername(
      username
    );

    if (!user) {
      throw new NotFoundException();
    }

    return {
      data: {
        ...user,
      },
      status: true,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id) {
    return this.userService.deleteUser(id);
  }

  @Patch('/:id')
  async updateUser(
    @Body() body: UpdateUserDTO,
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
