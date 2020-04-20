/* eslint-disable no-useless-constructor */
import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../entities/User.entity';

@Controller('users')
export class UserController {
  // eslint-disable-next-line no-empty-function
  constructor(private userService: UserService) {}

  @Get('/:username')
  async getByUsername(@Param('username') username): Promise<User> {
    return this.userService.getByUsername(username);
  }
}
