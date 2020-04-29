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

@Controller('comments')
export class CommentController {
  // eslint-disable-next-line no-useless-constructor
  constructor(private commentService: CommentService) {}
}
