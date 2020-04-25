import {
  IsOptional,
} from 'class-validator';

export class QueryDTO {
  @IsOptional()
  page!: number;

  @IsOptional()
  limit!: number;

  @IsOptional()
  search: string;

  @IsOptional()
  sort: any;

  @IsOptional()
  order: any
}
