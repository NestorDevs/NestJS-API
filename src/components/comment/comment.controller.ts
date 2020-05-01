/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty-function */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import {
  ApiOkResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CreateDTO } from './dto/create.dto';
import { UpdateCommentDTO } from './dto/updadeComment.dto';

@Controller('comments')
export class CommentController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private commentService: CommentService) {}

  @Post()
  create(@Body(ValidationPipe) commentDto: CreateDTO) {
    return this.commentService.addComment(commentDto);
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id) {
    return this.commentService.deleteComment(id);
  }

  @Patch('/:id')
  async updateComment(
    @Body() body: UpdateCommentDTO,
    @Param('id') id
  ) {
    return this.commentService.updateComment(
      id,
      body.content
    );
  }
}
