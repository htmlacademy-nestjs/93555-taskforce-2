import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { CommentsModule } from './comments/comments.module';
import { TagsModule } from './tags/tags.module';
import { PrismaModule } from './prisma/prisma.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [PrismaModule, TasksModule, CommentsModule, TagsModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
