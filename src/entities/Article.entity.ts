import {
  BeforeInsert,
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
import slugify from '../helpers/slugify';

import { Abstract } from './Abstract.entity';
import { User } from '../entities/User.entity';

@Entity({ name: 'articles' })
export class Article extends Abstract {
  @Column()
  @IsNotEmpty()
  title!: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  slug!: string;

  @Column({
    nullable: true,
  })
  content!: string;

  @ManyToOne(() => User)
  author!: User;

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJSON() {
    return classToPlain(this);
  }
}
