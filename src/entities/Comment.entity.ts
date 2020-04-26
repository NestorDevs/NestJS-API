import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import {
  classToPlain,
} from 'class-transformer';

import {
  IsNotEmpty,
} from 'class-validator';

import { Abstract } from './Abstract.entity';
import { User } from './User.entity';
import { Article } from './Article.entity';

@Entity({ name: 'comments' })
export class Comment extends Abstract {
  @IsNotEmpty()
  @Column()
  content!: string;

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Article, (article) => article.comments)
  article!: Article;

  toJSON() {
    return classToPlain(this);
  }
}
