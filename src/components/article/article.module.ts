import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from '../../entities/Article.entity';
import { Photo } from '../../entities/Photo.entity';
import { Tag } from '../../entities/Tag.entity';

@Module({
  controllers: [ArticleController],
  imports: [
    TypeOrmModule.forFeature([
      Article,
      Photo,
      Tag,
    ]),
  ],
  providers: [ArticleService],
})
export class ArticleModule {}
