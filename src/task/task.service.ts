import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Task, TaskDocument } from './schema/task.schema/task.schema';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name)
    private readonly taskModel: Model<TaskDocument>,
  ) {}

  // CREATE TASK
  async createTask(
    userId: string,
    categoryId: string,
    data: {
      title: string;
      description?: string;
      priority?: string;
    },
  ) {
    return this.taskModel.create({
      title: data.title,
      description: data.description,
      priority: data.priority,
      userId: new Types.ObjectId(userId),
      categoryId: new Types.ObjectId(categoryId),
    });
  }

  // GET ALL TASKS OF LOGGED-IN USER BY CATEGORY ID
  async getTasksByCategory(userId: string, categoryId: string) {
    return this.taskModel
      .find({
        userId: new Types.ObjectId(userId),
        categoryId: new Types.ObjectId(categoryId),
      })
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 });
  }

  // GET TASK BY ID (OWNERSHIP CHECK)
  async getTaskById(taskId: string, userId: string) {
    const task = await this.taskModel.findOne({
      _id: taskId,
      userId,
    });

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  // UPDATE TASK
  async updateTask(taskId: string, userId: string, data: Partial<Task>) {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: taskId, userId },
      data,
      { new: true },
    );

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }

  // DELETE TASK
  async deleteTask(taskId: string, userId: string) {
    const task = await this.taskModel.findOneAndDelete({
      _id: taskId,
      userId,
    });

    if (!task) throw new NotFoundException('Task not found');
    return { message: 'Task deleted successfully' };
  }
}
