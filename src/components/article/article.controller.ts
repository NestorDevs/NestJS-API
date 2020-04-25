/* eslint-disable no-empty-function */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Res,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiOkResponse,
} from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateDTO } from './dto/create.dto';
import { ListDTO } from './dto/list.dto';

@Controller('articles')
export class ArticleController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private articleService: ArticleService) {}

  @ApiOkResponse({ description: 'List all users' })
  @Get('')
  async getArticlesList(
    @Query() query: ListDTO,
    @Res() res: Response
  ) {
    return this.articleService.getArticlesList(
      query.page,
      query.limit,
      query.search,
      query.sort,
      query.order
    ).then((articles) => res.status(200).json({
      data: {
        ...articles,
      },
      status: true,
    }));
  }

  @Post()
  create(@Body(ValidationPipe) articleDto: CreateDTO) {
    return this.articleService.create(articleDto);
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id) {
    return this.articleService.deleteArticle(id);
  }
}
