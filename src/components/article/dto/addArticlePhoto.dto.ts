import {
  IsNotEmpty,
} from 'class-validator';
import { Article } from 'src/entities/Article.entity';
import { User } from 'src/entities/User.entity';

export class AddArticlePhotoDTO {
  title!: string;

  @IsNotEmpty()
  author!: User;

  @IsNotEmpty()
  article!: Article;

  @IsNotEmpty()
  filename!: string;
}
