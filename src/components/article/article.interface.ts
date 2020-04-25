import { Article } from '../../entities/Article.entity';

export interface ArticlesList {
  list: Article[],
  page: number,
  pages: number,
  totalCount: number;
}
