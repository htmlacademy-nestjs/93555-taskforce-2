import { CRUDRepository } from '@taskforce/core';
import { CommentsEntity } from '../comments/comments.entity';
import { Comment } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsRepository implements CRUDRepository<CommentsEntity, number, Comment> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: CommentsEntity): Promise<Comment> {
    return this.prisma.comment.create({
      data: entity.toObject(),
    });
  }

  public async delete(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: { id: commentId },
    });
  }

  public findById(commentId: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: { id: commentId },
    });
  }

  public findByTask(taskId: number): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: { taskId },
    });
  }

  public update(commentId: number, entity: CommentsEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: { id: commentId },
      data: { ...entity.toObject(), id: commentId },
    });
  }
}
