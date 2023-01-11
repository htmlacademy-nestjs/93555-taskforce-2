import { Comment } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';


export class CommentsEntity implements Entity<Comment> {
  public id: number;
  public text: string;
  public taskId: number;
  public userId: string;
  public createdAt: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment) {
    this.id = entity.id;
    this.text = entity.text;
    this.taskId = entity.taskId;
    this.userId = entity.userId;
    this.createdAt = new Date();
  }

  public toObject(): Comment {
    return {
      id: this.id,
      text: this.text,
      taskId: this.taskId,
      userId: this.userId,
      createdAt: this.createdAt
    };
  }
}
