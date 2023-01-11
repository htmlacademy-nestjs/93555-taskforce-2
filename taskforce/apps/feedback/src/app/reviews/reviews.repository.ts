import { CRUDRepository } from '@taskforce/core';
import { ReviewsEntity } from './reviews.entity';
import { Review } from '@taskforce/shared-types';
import { PrismaService } from '../prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsRepository implements CRUDRepository<ReviewsEntity, number, Review> {
  constructor(private readonly prisma: PrismaService) { }

  public async create(entity: ReviewsEntity): Promise<Review> {
    const entityData = entity.toObject();

    return this.prisma.review.create({
      data: entityData
    })
  }

  public async delete(id: number): Promise<void> {
    await this.prisma.review.delete({
      where: { id },
    });
  }

  public findById(id: number): Promise<Review | null> {
    return this.prisma.review.findFirst({
      where: { id },
    });
  }

  public findByTask(taskId: number): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { taskId },
    });
  }

  public update(id: number, entity: ReviewsEntity): Promise<Review> {
    const entityData = entity.toObject();

    return this.prisma.review.update({
      where: { id },
      data: entityData
    });
  }
}
