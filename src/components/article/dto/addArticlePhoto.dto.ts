import {
  IsNotEmpty,
} from 'class-validator';

export class AddArticlePhotoDTO {
  title!: string;

  @IsNotEmpty()
  author!: number | any;

  @IsNotEmpty()
  article: number | any;

  @IsNotEmpty()
  filename!: string;
}
