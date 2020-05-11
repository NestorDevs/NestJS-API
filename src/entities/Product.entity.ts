import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
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
import { User } from './User.entity';
import { Tag } from './Tag.entity';

@Entity({ name: 'products' })
export class Product extends Abstract {
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
