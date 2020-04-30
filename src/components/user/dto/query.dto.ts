import {
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDTO {
  @ApiProperty()
  @IsOptional()
  page!: number;

  @ApiProperty()
  @IsOptional()
  limit!: number;

  @ApiProperty()
  @IsOptional()
  search: string;

  @ApiProperty()
  @IsOptional()
  sort: any;

  @ApiProperty()
  @IsOptional()
  order: any
}
