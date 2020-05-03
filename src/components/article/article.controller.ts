/* eslint-disable no-empty-function */
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ArticleService } from './article.service';
import { CreateDTO } from './dto/create.dto';
import { ListDTO } from './dto/list.dto';
import { UpdateDTO } from './dto/update.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private articleService: ArticleService) {}

  @ApiOkResponse({ description: 'List all users' })
  @Get('')
  async getArticlesList(
    @Query() query: ListDTO
  ) {
    const articles = await this.articleService.getArticlesList(
      query.page,
      query.limit,
      query.search,
      query.sort,
      query.order
    );

    return {
      data: {
        ...articles,
      },
      status: true,
    };
  }

  @Get('/:id')
  async getById(
    @Param('id') id
  ) {
    const article = await this.articleService.getById(id);

    if (!article) {
      throw new NotFoundException();
    }

    return {
      data: {
        ...article,
      },
      status: true,
    };
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body(ValidationPipe) articleDto: CreateDTO) {
    return this.articleService.create(articleDto);
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id) {
    return this.articleService.deleteArticle(id);
  }

  @Patch('/:id')
  async updateArticle(
    @Body() body: UpdateDTO,
    @Param('id') id
  ) {
    return this.articleService.updateArticle(
      id,
      body.content,
      body.title
    );
  }
}
