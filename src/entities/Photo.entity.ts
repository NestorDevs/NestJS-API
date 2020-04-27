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

@Entity({ name: 'photos' })
export class Photo extends Abstract {
  @IsNotEmpty()
  @Column()
  title!: string;

  @IsNotEmpty()
  @Column()
  filename!: string

  @ManyToOne(() => User)
  author!: User;

  @ManyToOne(() => Article, (article) => article.photos)
  article!: Article;

  toJSON() {
    return classToPlain(this);
  }
}
