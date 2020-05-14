import { ApiProperty } from '@nestjs/swagger';

export class UpdateArticleDTO {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly content: string;
}
