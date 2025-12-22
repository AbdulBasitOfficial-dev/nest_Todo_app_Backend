import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/user/decorator/user.decorator';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/Guard/jwt-auth.guard';

@Controller('task')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // CREATE TASK
  @Post('category/:categoryId')
  createTask(
    @Param('categoryId') categoryId: string, // frontend se
    @Body()
    data: {
      title: string;
      description?: string;
      priority?: string;
    },
    @GetUser('id') userId: string, // JWT se
  ) {
    return this.taskService.createTask(userId, categoryId, data);
  }

  // GET TASKS BY CATEGORY (USER SPECIFIC)
  @Get('category/:categoryId')
  getTasksByCategory(
    @Param('categoryId') categoryId: string,
    @GetUser('id') userId: string,
  ) {
    return this.taskService.getTasksByCategory(userId, categoryId);
  }

  // GET TASK BY ID
  @Get(':id')
  getById(@Param('id') taskId: string, @GetUser('id') userId: string) {
    return this.taskService.getTaskById(taskId, userId);
  }

  // UPDATE TASK
  @Put(':id')
  updateTask(
    @Param('id') taskId: string,
    @GetUser('id') userId: string,
    @Body() data: any,
  ) {
    return this.taskService.updateTask(taskId, userId, data);
  }

  // DELETE TASK
  @Delete(':id')
  deleteTask(@Param('id') taskId: string, @GetUser('id') userId: string) {
    return this.taskService.deleteTask(taskId, userId);
  }
}
