import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTaskDTO } from './dto/create-task.dto';
import { UpdateTaskDTO } from './dto/update-task.dto';
import { TaskQuery } from './query/task.query';
import { TasksService } from './tasks.service';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) { }

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task created',
  })
  async createTask(@Body() dto: CreateTaskDTO) {
    return this.taskService.createTask(dto);
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tasks list',
  })
  async getTasks(@Query() query: TaskQuery) {
    return this.taskService.getTasks(query);
  }

  @Get(':taskId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task found',
  })
  async getTask(@Param('taskId') taskId: number) {
    return this.taskService.getTask(taskId);
  }

  @Patch(':taskId')
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task updated',
  })
  async updateTask(@Param('taskId') taskId: number, @Body() dto: UpdateTaskDTO) {

    return this.taskService.updateTask(taskId, dto);
  }
}
