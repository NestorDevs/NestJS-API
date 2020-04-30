import {
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { LoginDTO } from './login.dto';

export class RegisterDTO extends LoginDTO {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(16)
  username!: string;
}
