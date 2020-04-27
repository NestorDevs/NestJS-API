import {
  BeforeInsert,
  Column,
  Entity,
} from 'typeorm';

import {
  classToPlain,
  Exclude,
} from 'class-transformer';

import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

import * as bcrypt from 'bcrypt';
import { Abstract } from './Abstract.entity';

export enum UserRole {
  ADMIN = 'admin',
  AUTHOR = 'author',
  USER = 'user'
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending'
}

@Entity({ name: 'users' })
export class User extends Abstract {
  @Column({
    unique: true,
  })
  @Matches(/^[a-zA-Z0-9.\-_]*$/, {
    message: 'Only letters, numbers and special signs: .-_ are allowed',
  })
  @IsNotEmpty()
  @Length(1, 16)
  username!: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^+]+@.*$/, {
    message: 'Cannot be an email alias',
  })
  email!: string;

  @Column({
    default: false,
  })
  isEmailVerified!: boolean;

  @Column()
  @Exclude()
  password!: string;

  @Column({
    nullable: true,
  })
  firstName!: string;

  @Column({
    nullable: true,
  })
  lastName!: string;

  @Column({
    nullable: true,
    unique: true,
  })
  @IsNotEmpty()
  @Matches(/^[+][1-9][0-9]{1,15}$/, {
    message: 'Must be a valid number format, i.e. +48 100 200 300',
  })
  phoneNumber!: string;

  @Column({
    default: UserRole.USER,
    enum: UserRole,
    type: 'enum',
  })
  role!: UserRole;

  @Column({
    default: UserStatus.INACTIVE,
    enum: UserStatus,
    type: 'enum',
  })
  status!: UserStatus;

  @Column({
    default: false,
  })
  isBlocked!: boolean;

  @BeforeInsert()
  toLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  @BeforeInsert()
  hash(): void {
    this.password = bcrypt.hashSync(this.password, 12);
  }

  compare(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  toJSON() {
    return classToPlain(this);
  }
}
