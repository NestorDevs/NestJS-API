import {
  IsNotEmpty,
} from 'class-validator';

export class CreateDTO {
  @IsNotEmpty()
  title!: string;

  @IsNotEmpty()
  slug!: string;

  content!: string;

  @IsNotEmpty()
  author!: number;
}
