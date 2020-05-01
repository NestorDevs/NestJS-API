import {
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDTO {
  @ApiProperty()
  @IsString()
  readonly content: string;
}
