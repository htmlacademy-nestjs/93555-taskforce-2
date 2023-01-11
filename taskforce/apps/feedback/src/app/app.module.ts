import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [PrismaModule, ReviewsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
