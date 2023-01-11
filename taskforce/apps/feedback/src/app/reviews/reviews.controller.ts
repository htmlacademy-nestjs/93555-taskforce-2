import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@taskforce/core';
import { CreateReviewDTO } from './dto/create-review.dto';
import { UpdateReviewDTO } from './dto/update-review.dto';
import { ReviewRDO } from './rdo/review.rdo';
import { ReviewsService } from './reviews.service';

@ApiTags('reviews')
@Controller('tasks/:taskId/reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) { }
  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Review created',
  })
  async createReview(@Param('taskId') taskId: number, @Body() dto: CreateReviewDTO) {
    return this.reviewsService.createReview({ taskId, ...dto });
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reviews list',
  })
  async getReviews(@Param('taskId') taskId: number) {
    const reviews = this.reviewsService.getReviews(taskId);

    return fillObject(ReviewRDO, reviews);
  }

  @Patch(':reviewId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Review updated',
  })
  async updateReview(
    @Param('taskId') taskId: number,
    @Param('reviewId') reviewId: number,
    @Body() dto: UpdateReviewDTO
  ) {
    const updatedReview = this.reviewsService.updateReview(reviewId, { ...dto, taskId });

    return fillObject(ReviewRDO, updatedReview);
  }

  @Delete(':reviewId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteReview(@Param('reviewId') reviewId: number) {
    this.reviewsService.deleteReview(reviewId);
  }
}
