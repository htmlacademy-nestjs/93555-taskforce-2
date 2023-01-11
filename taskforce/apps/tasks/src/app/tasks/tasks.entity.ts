import { Comment, Tag, Task, TaskStatus } from '@taskforce/shared-types';
import { Entity } from '@taskforce/core';


export class TasksEntity implements Entity<Task> {
  public id: number;
  public title: string;
  public description: string;
  public categoryId: number;
  public status: TaskStatus;
  public price: number;
  public image: string;
  public address: string;
  public tags: Tag[];
  public userId: string;
  public comments: Comment[];
  public createdAt: Date;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Task) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.categoryId = entity.categoryId;
    this.status = entity.status;
    this.price = entity.price;
    this.image = entity.image;
    this.address = entity.address;
    this.tags = entity.tags;
    this.userId = entity.userId;
    this.comments = entity.comments || [];
    this.createdAt = new Date();
  }

  public toObject(): Task {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      categoryId: this.categoryId,
      status: this.status,
      price: this.price,
      image: this.image,
      address: this.address,
      tags: this.tags,
      userId: this.userId,
      comments: this.comments,
      createdAt: this.createdAt
    };
  }
}
