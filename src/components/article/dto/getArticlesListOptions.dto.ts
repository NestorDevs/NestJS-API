import {
  IsOptional,
} from 'class-validator';

export class GetArticlesListOptionsDTO {
  @IsOptional()
  page!: string;

  @IsOptional()
  limit!: string;

  @IsOptional()
  search: string;

  @IsOptional()
  sort: string;

  @IsOptional()
  order: string | any
}
