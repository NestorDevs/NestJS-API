import {
  IsEmail,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty()
  @IsOptional()
  readonly firstName: string

  @ApiProperty()
  @IsOptional()
  readonly lastName: string;
}
