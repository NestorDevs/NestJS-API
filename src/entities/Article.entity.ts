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
  slugify(): void {
    this.slug = this.title.toString().toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  toJSON() {
    return classToPlain(this);
  }
}
