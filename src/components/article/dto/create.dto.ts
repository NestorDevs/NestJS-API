import {
  IsNotEmpty,
} from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  title!: string;

  content!: string;

  @IsNotEmpty()
  author!: string;
}
