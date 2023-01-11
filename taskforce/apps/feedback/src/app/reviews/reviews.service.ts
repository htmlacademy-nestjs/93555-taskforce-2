import { Injectable } from '@nestjs/common';
import { Review } from '@taskforce/shared-types';
import { CreateReviewDTO } from './dto/create-review.dto';
import { UpdateReviewDTO } from './dto/update-review.dto';
import { ReviewsEntity } from './reviews.entity';
import { ReviewsRepository } from './reviews.repository';

@Injectable()
export class ReviewsService {
  constructor(private readonly reviewsRepository: ReviewsRepository) { }

  async createReview(dto: CreateReviewDTO): Promise<Review> {
    const reviewsEntity = new ReviewsEntity(dto);
    return this.reviewsRepository.create(reviewsEntity);
  }

  async deleteReview(id: number): Promise<void> {
    this.reviewsRepository.delete(id);
  }

  async getReview(id: number): Promise<Review> {
    return this.reviewsRepository.findById(id);
  }

  async getReviews(taskId: number): Promise<Review[]> {
    return this.reviewsRepository.findByTask(taskId);
  }

  async updateReview(id: number, dto: UpdateReviewDTO): Promise<Review> {
    return this.reviewsRepository.update(id, new ReviewsEntity(dto));
  }
}
