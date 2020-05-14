import {
  IsNotEmpty,
} from 'class-validator';

export class AddArticleDTO {
  @IsNotEmpty()
  title!: string;

  content!: string;

  @IsNotEmpty()
  author!: string;
}
