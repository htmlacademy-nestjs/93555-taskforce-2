import { Module } from '@nestjs/common';
import { CommentsModule } from '../comments/comments.module';
import { TagsModule } from '../tags/tags.module';
import { TasksController } from './tasks.controller';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

@Module({
  imports: [TagsModule, CommentsModule],
  controllers: [TasksController],
  providers: [TasksService, TasksRepository],
  exports: [TasksRepository],
})
export class TasksModule { }
