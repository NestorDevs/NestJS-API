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
import { CreateDTO } from './dto/create.dto';
import { ListDTO } from './dto/list.dto';
import { UpdateDTO } from './dto/update.dto';
import {
  editFileName,
  imageFilter,
} from '../../utils/fileUpload.utils';
import { AddArticlePhotoDTO } from './dto/addArticlePhoto.dto';

@ApiTags('articles')
@Controller('articles')
export class ArticleController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private articleService: ArticleService) {}

  @ApiOkResponse({ description: 'List all articles' })
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
