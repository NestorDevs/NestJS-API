import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from '../../entities/Article.entity';

@Module({
  controllers: [ArticleController],
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([Article]),
  ],
  providers: [ArticleService],
})
export class ArticleModule {}
