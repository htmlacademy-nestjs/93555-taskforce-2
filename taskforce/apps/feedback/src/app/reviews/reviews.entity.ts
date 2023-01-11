import { Review } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';


export class ReviewsEntity implements Entity<Review> {
  public id?: number;
  public text: string;
  public taskId: number;
  public rating: number;
  public userId: string;
  public createdAt: Date;

  constructor(task: Review) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Review) {
    this.id = entity.id;
    this.text = entity.text;
    this.taskId = entity.taskId;
    this.rating = entity.rating;
    this.userId = entity.userId;
    this.createdAt = new Date();
  }

  public toObject(): Review {
    return {
      id: this.id,
      text: this.text,
      taskId: this.taskId,
      rating: this.rating,
      userId: this.userId,
      createdAt: this.createdAt
    };
  }
}
