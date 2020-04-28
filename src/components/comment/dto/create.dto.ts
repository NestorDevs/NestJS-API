import {
  IsNotEmpty,
} from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  content!: string;

  @IsNotEmpty()
  author!: string;

  @IsNotEmpty()
  article!: string;
}
