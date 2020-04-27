import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import {
  classToPlain,
} from 'class-transformer';

import {
  IsNotEmpty,
} from 'class-validator';
import slugify from '../helpers/slugify';

import { Abstract } from './Abstract.entity';
import { User } from './User.entity';
import { Comment } from './Comment.entity';
import { Photo } from './Photo.entity';
import { Tag } from './Tag.entity';

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

  @OneToMany(() => Comment, (comment) => comment.article)
  comments!: Comment[];

  @OneToMany(() => Photo, (photo) => photo.article)
  photos!: Photo[];

  @ManyToMany(() => Tag)
  @JoinTable()
  tags!: Tag[];

  @BeforeInsert()
  convertSlug(): void {
    this.slug = slugify(this.title);
  }

  toJSON() {
    return classToPlain(this);
  }
}
