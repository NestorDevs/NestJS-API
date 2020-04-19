import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  IsEmail,
  IsNotEmpty,
  Length,
  Matches,
} from 'class-validator';

import * as bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class UserModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  @Matches(/^[a-zA-Z0-9.\-_]*$/, {
    message: 'Only letters, numbers and special signs: .-_ are allowed',
  })
  @IsNotEmpty()
  @Length(1, 16)
  username: string;

  @Column({
    unique: true,
  })
  @IsNotEmpty()
  @IsEmail()
  @Matches(/^[^+]+@.*$/, {
    message: 'Cannot be an email alias',
  })
  email: string;

  @Column({
    default: false,
  })
  isEmailVerified: boolean;

  @Column()
  password: string;

  @Column({
    nullable: true,
    unique: true,
  })
  @IsNotEmpty()
  @Matches(/^[+][1-9][0-9]{1,15}$/, {
    message: 'Must be a valid number format, i.e. +48 100 200 300',
  })
  phoneNumber: string;

  @Column({
    default: false,
  })
  isActive: boolean;

  @Column({
    default: false,
  })
  isBlocked: boolean;

  @Column({
    default: undefined,
    nullable: true,
  })
  resetPasswordToken: string | undefined;

  @Column({
    default: undefined,
    nullable: true,
    type: 'timestamp with time zone',
  })
  resetPasswordTokenExpire: Date | undefined;

  @Column({
    default: undefined,
    nullable: true,
  })
  requestEmailChangeToken: string | undefined;

  @Column({
    default: undefined,
    nullable: true,
    type: 'timestamp with time zone',
  })
  requestEmailChangeTokenExpire: Date | undefined;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  @BeforeInsert()
  toLowerCase(): void {
    this.email = this.email.toLowerCase();
  }

  hash(): void {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  compare(unencryptedPassword: string): boolean {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}