import {
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddArticleDTO {
  @ApiProperty()
  @IsNotEmpty()
  title!: string;

  @ApiProperty()
  content!: string;

  @ApiProperty()
  @IsNotEmpty()
  author!: string;
}
