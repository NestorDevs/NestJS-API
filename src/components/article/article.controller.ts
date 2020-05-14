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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ArticleService } from './article.service';
import { AddArticleDTO } from './dto/addArticle.dto';
import { GetArticlesListOptionsDTO } from './dto/getArticlesListOptions.dto';
import { UpdateArticleDTO } from './dto/updateArticle.dto';
import {
  editFileName,
  imageFilter,
} from '../../utils/fileUpload.utils';
import { AddArticlePhotoDTO } from './dto/addArticlePhoto.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @ApiOkResponse({ description: 'List all articles' })
  @Get('')
  async getArticlesList(
    @Query() query: GetArticlesListOptionsDTO
  ) {
    const {
      order,
      page,
      limit: perPage,
      search,
      sort,
    } = query;

    const currentPage = parseFloat(page) || undefined;
    const currentLimit = parseFloat(perPage) || undefined;
    const orderParsed = order ? order.toUpperCase() : undefined;
    const phrase = search ? search.toLowerCase() : '';

    const articles = await this.articleService.getArticlesList(
      currentPage,
      currentLimit,
      phrase,
      sort,
      orderParsed
    );

    return {
      data: {
        ...articles,
      },
      status: true,
    };
  }

  @Get('/:id')
  @ApiParam({
    example: 1,
    name: 'id',
    required: true,
    type: Number,
  })
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

  @Post('/upload/:id')
  @UseInterceptors(FileInterceptor('image', {
    fileFilter: imageFilter,
    storage: diskStorage({
      destination: './src/files',
      filename: editFileName,
    }),
  }))
  async uploadedFile(
    @Body() addArticlePhotoDto: AddArticlePhotoDTO,
    @Param('id') id,
    @UploadedFile() file
  ) {
    const data = addArticlePhotoDto;

    data.article = id;
    data.filename = file.filename;

    return this.articleService.addArticlePhoto(
      data
    );
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body(ValidationPipe) articleDto: AddArticleDTO) {
    return this.articleService.create(articleDto);
  }

  @Delete('/:id')
  async deleteArticle(@Param('id') id) {
    return this.articleService.deleteArticle(id);
  }

  @Patch('/:id')
  async updateArticle(
    @Body() body: UpdateArticleDTO,
    @Param('id') id
  ) {
    return this.articleService.updateArticle(
      id,
      body.content,
      body.title
    );
  }
}
