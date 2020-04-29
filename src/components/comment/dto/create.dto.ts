import {
  IsNotEmpty,
} from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  content!: string;

  @IsNotEmpty()
  author!: number | any;

  @IsNotEmpty()
  article!: number | any;
}
