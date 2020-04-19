/* eslint-disable no-empty-function */
import {
  Body,
  Controller,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private authService: AuthService) {}

  @Post()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register(@Body() credentials: RegisterDTO) {
    return this.authService.register();
  }

  @Post('/login')
  login(@Body() credentials: LoginDTO) {
    return this.authService.login(credentials);
  }
}
