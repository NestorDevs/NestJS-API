import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from '../entities/User.entity';

@Module({
  controllers: [UserController],
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UserService],
})
export class UserModule {}
