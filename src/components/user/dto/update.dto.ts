import { ApiProperty } from '@nestjs/swagger';

export class UpdateDTO {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string

  @ApiProperty()
  readonly lastName: string;
}
