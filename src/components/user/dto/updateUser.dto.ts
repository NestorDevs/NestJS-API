import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDTO {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly firstName: string

  @ApiProperty()
  readonly lastName: string;
}
