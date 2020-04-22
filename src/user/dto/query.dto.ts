import { ApiProperty } from '@nestjs/swagger';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class QueryDTO {
  @ApiProperty()
  page: number = 1;

  @ApiProperty()
  limit: number = 10;

  @ApiProperty()
  search: string = '';

  @ApiProperty()
  sort: string = 'id';

  @ApiProperty()
  order: Order.DESC
}
