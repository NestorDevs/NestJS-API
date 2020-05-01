import {
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDTO {
  @ApiProperty()
  @IsNotEmpty()
  content!: string;

  @ApiProperty()
  @IsNotEmpty()
  author!: number | any;

  @ApiProperty()
  @IsNotEmpty()
  article!: number | any;
}
