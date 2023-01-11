import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { CommentsService } from './comments.service';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';
import { CommentRDO } from './rdo/comment.rdo';

@ApiTags('comments')
@Controller('tasks/:taskId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Comment created',
  })
  async createComment(@Param('taskId') taskId: number, @Body() dto: CreateCommentDTO) {
    return this.commentsService.createComment({ taskId, ...dto });
  }


  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comments list',
    type: CommentRDO,
  })
  async getComments(@Param('taskId') taskId: number) {
    const comments = this.commentsService.getComments(taskId);

    return fillObject(CommentRDO, comments);
  }

  @Put(':commentId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Comment updated',
  })
  async updateComment(
    @Param('taskId') taskId: number,
    @Param('commentId') commentId: number,
    @Body() dto: UpdateCommentDTO
  ) {
    const updatedComment = this.commentsService.updateComment(commentId, { ...dto, taskId });

    return fillObject(CommentRDO, updatedComment);
  }

  @Delete(':commentId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(@Param('commentId') commentId: number) {
    this.commentsService.deleteComment(commentId);
  }
}
