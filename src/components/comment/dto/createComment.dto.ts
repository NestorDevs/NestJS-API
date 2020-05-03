import {
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../../entities/User.entity';
import { Article } from '../../../entities/Article.entity';

export class CreateCommentDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly content: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly author: User;

  @ApiProperty()
  @IsNotEmpty()
  readonly article: Article;
}
