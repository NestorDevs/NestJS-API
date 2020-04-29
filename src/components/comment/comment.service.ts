/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-function */
import {
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  getRepository,
  Repository,
} from 'typeorm';
import { Comment } from '../../entities/Comment.entity';
import { CreateDTO } from './dto/create.dto';

@Injectable()
export class CommentService {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @InjectRepository(Comment) private comment:Repository<Comment>
  ) {}

  addComment = async (
    commentDto: CreateDTO
  ): Promise<Comment> => {
    try {
      const comment = this.comment.create(commentDto);

      await comment.save();

      return comment;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
