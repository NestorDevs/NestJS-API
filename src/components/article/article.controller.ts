/* eslint-disable no-empty-function */
import {
  Body,
  Controller,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateDTO } from './dto/create.dto';

@Controller('articles')
export class ArticleController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private articleService: ArticleService) {}

  @Post()
  create(@Body(ValidationPipe) articleDto: CreateDTO) {
    return this.articleService.create(articleDto);
  }
}
