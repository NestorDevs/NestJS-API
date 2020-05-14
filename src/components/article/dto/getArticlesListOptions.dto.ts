import {
  IsString,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetArticlesListOptionsDTO {
  @ApiPropertyOptional()
  @IsString()
  page!: string;

  @ApiPropertyOptional()
  @IsString()
  limit!: string;

  @ApiPropertyOptional()
  @IsString()
  search: string;

  @ApiPropertyOptional()
  @IsString()
  sort: string;

  @ApiPropertyOptional()
  order: string | any
}
