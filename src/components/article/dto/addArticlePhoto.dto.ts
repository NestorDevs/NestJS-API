import {
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddArticlePhotoDTO {
  @ApiProperty()
  title!: string;

  @ApiProperty()
  @IsNotEmpty()
  author!: string;

  @ApiProperty()
  @IsNotEmpty()
  article: number | any;

  @ApiProperty()
  @IsNotEmpty()
  filename!: string;
}
