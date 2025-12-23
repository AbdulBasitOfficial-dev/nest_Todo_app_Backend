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
import { CategoryService } from './category.service';
import { GetUser } from '../user/decorator/user.decorator';
import { JwtAuthGuard } from '../auth/Guard/jwt-auth.guard';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // Post
  @Post()
  async Create(
    @Body() data: { name: string; discription: string },
    @GetUser('id') userId: string,
  ) {
    return this.categoryService.createCategory(
      userId,
      data.name,
      data.discription,
    );
  }

  //   Get BY User ID (must come before Get By Id to avoid route conflict)
  @Get()
  async getByUserID(@GetUser('id') userId: string) {
    return this.categoryService.getCategoryBYUserId(userId);
  }

  //    Get By Id
  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.categoryService.getByIdCategory(id);
  }

  //   Delete
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  //   Update
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() data: { name: string; discription: string },
  ) {
    return this.categoryService.updateCAtegoy(id, data.name, data.discription);
  }
}
