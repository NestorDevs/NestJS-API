/* eslint-disable no-empty-function */
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private authService: AuthService) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(@Body() credentials) {
    return this.authService.register();
  }

  @Post('/login')
  login(@Body() credentials) {
    return this.authService.login(credentials);
  }
}
