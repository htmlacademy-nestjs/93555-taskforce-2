import { Injectable } from '@nestjs/common';
import { Comment } from '@taskforce/shared-types';
import { CommentsEntity } from './comments.entity';
import { CommentsRepository } from './comments.repository';
import { CreateCommentDTO } from './dto/create-comment.dto';
import { UpdateCommentDTO } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) { }

  async createComment(dto: CreateCommentDTO): Promise<Comment> {
    const commentsEntity = new CommentsEntity(dto);
    return this.commentsRepository.create(commentsEntity);
  }

  async deleteComment(id: number): Promise<void> {
    this.commentsRepository.delete(id);
  }

  async getComment(id: number): Promise<Comment> {
    return this.commentsRepository.findById(id);
  }

  async getComments(taskId: number): Promise<Comment[]> {
    return this.commentsRepository.findByTask(taskId);
  }

  async updateComment(id: number, dto: UpdateCommentDTO): Promise<Comment> {
    return this.commentsRepository.update(id, new CommentsEntity(dto));
  }
}
