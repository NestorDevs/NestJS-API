import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from '../../entities/Comment.entity';

@Module({
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentService],
})
export class CommentModule {}
