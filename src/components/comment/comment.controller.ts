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
  ApiResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CreateCommentDTO } from './dto/createComment.dto';
import { UpdateCommentDTO } from './dto/updateComment.dto';

@Controller('comments')
export class CommentController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body(ValidationPipe) commentDto: CreateCommentDTO) {
    return this.commentService.addComment(commentDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deleteComment(@Param('id') id) {
    return this.commentService.deleteComment(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('/:id')
  @ApiResponse({
    description: 'The record has been successfully modified.',
    status: 200,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized.',
    status: 401,
  })
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
