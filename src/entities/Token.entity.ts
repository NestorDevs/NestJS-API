import {
  Column,
  Entity,
  ManyToOne,
} from 'typeorm';

import { Abstract } from './Abstract.entity';
import { User } from './User.entity';

export enum TokenType {
  EMAIL_VERIFICATION_REQUEST = 'emailVerificationToken',
  EMAIL_CHANGE_REQUEST = 'emailChangeToken',
  PASSWORD_CHANGE_REQUEST = 'passwordChangeToken',
  PASSWORD_FORGOT_REQUEST = 'passwordForgotToken',
  PASSWORD_RESET_REQUEST = 'passwordResetToken'
}

@Entity({ name: 'tokens' })
export class Token extends Abstract {
  @ManyToOne(() => User)
  user!: User;

  @Column()
  token!: string;

  @Column({
    enum: TokenType,
    nullable: true,
    type: 'enum',
  })
  type!: TokenType;

  @Column()
  validTo!: Date;
}
