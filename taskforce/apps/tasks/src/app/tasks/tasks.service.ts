import { Injectable } from '@nestjs/common';
import { CommentsRepository } from '../comments/comments.repository';
import { TagsRepository } from '../tags/tags.repository';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import { TasksEntity } from './tasks.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    private readonly tasksRepository: TasksRepository,
    private readonly tagsRepository: TagsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) { }

  async createTask(dto: CreateTaskDTO) {
    const tags = await this.tagsRepository.find(dto.tags);
    const tagsEntity = new TasksEntity({ ...dto, tags, comments: [] });

    return this.tasksRepository.create(tagsEntity);
  }

  async getTask(taskId: number) {
    return this.tasksRepository.findById(taskId);
  }

  async getTasks(query: TaskQuery) {
    return this.tasksRepository.find(query);
  }

  async updateTask(id: number, dto: UpdateTaskDTO) {
    const task = await this.tasksRepository.findById(id)
    const tags = await this.tagsRepository.find(dto.tags);
    const comments = await this.commentsRepository.findByTask(id);
    const taskEntity = new TasksEntity({ ...task, ...dto, tags, comments });

    return this.tasksRepository.update(id, taskEntity)
  }
}
