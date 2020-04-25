/* eslint-disable no-empty-function */
import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from '../../entities/Article.entity';
import { CreateDTO } from './dto/create.dto';

@Injectable()
export class ArticleService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(Article) private article:Repository<Article>
  ) {}

  create = async (
    articleDto: CreateDTO
  ): Promise<Article> => {
    try {
      const article = this.article.create(articleDto);

      await article.save();

      return article;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
