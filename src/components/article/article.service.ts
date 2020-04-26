/* eslint-disable no-empty-function */
import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getRepository,
  Repository,
} from 'typeorm';
import { Article } from '../../entities/Article.entity';
import { CreateDTO } from './dto/create.dto';
import { ArticlesList } from './article.interface';
import Helpers from '../../utils/helpers';

export enum Order {
  ASC = 'ASC',
  DESC = 'DESC',
}

@Injectable()
export class ArticleService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(Article) private article:Repository<Article>
  ) {}

  getArticlesList = async (
    page = 1,
    limit = 10,
    search = '',
    sort = 'id',
    order = Order.DESC
  ): Promise<ArticlesList> => {
    const offset = (page - 1) * limit;

    const articlesCount = await getRepository(Article)
      .createQueryBuilder('article')
      .where('LOWER(article.title) LIKE :search', { search: `%${search}%` })
      .getCount();

    const articlesList = await getRepository(Article)
      .createQueryBuilder('article')
      .select([
        'article.id',
        'article.title',
        'article.slug',
        'article.content',
        'article.createdAt',
        'article.updatedAt',
      ])
      .leftJoin('article.author', 'user')
      .addSelect([
        'user.id',
        'user.username',
        'user.email',
        'user.firstName',
        'user.lastName',
        'user.role',
      ])
      .where('LOWER(article.title) LIKE :search', { search: `%${search}%` })
      .skip(offset)
      .take(limit)
      .orderBy(`article.${sort}`, order)
      .getMany();

    const pages = Helpers.calculatePages(articlesCount, limit);

    return {
      list: articlesList,
      page,
      pages,
      totalCount: articlesCount,
    };
  }

  getById = (
    id: string
  ): Promise<Article> => getRepository(Article)
    .createQueryBuilder('article')
    .select([
      'article.id',
      'article.title',
      'article.slug',
      'article.content',
      'article.createdAt',
      'article.updatedAt',
    ])
    .where('article.id = :id', { id })
    .getOne();

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

  deleteArticle = (
    id: string
  ) => getRepository(Article)
    .createQueryBuilder('article')
    .delete()
    .from(Article)
    .where('id = :id', { id })
    .execute();

  updateArticle = (
    id: string,
    title: string,
    content: string
  ) => getRepository(Article)
    .createQueryBuilder('article')
    .update(Article)
    .set({
      content,
      title,
    })
    .where('id = :id', { id })
    .execute();
}
