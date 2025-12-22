import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, categoryDocumnet } from './schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<categoryDocumnet>,
  ) {}

  //   Create Category
  async createCategory(userId: string, name: string, discription?: string) {
    console.log(' User Id Herer ', userId);
    const category = new this.categoryModel({ name, userId, discription });
    return category.save();
  }

  //   fetch all Category
  async getAllCategory() {
    return this.categoryModel.find().exec();
  }

  //   Fetch by User Id Category
  async getCategoryBYUserId(userId: string) {
    const category = await this.categoryModel
      .find({ userId: userId })
      .sort({ createdAt: -1 })
      .exec();
    if (!category) {
      return {
        Message: 'User have No Category',
      };
    }
    return {
      count: category.length,
      category,
    };
  }

  //   fetch by id  Category
  async getByIdCategory(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException();
    return category;
  }

  //   Delete Category
  async deleteCategory(id: string) {
    const user = await this.categoryModel.findById(id);
    if (!user) throw new NotFoundException('User Not FOund');
    const deleteUser = await this.categoryModel.findByIdAndDelete(id);
    return { Message: 'User delete successfully', data: deleteUser };
  }

  // Update Category
  async updateCAtegoy(id: string, name: string, discription?: string) {
    const user = await this.categoryModel.findById(id);
    if (!user) throw new NotFoundException('User Not FOund');
    const updateUser = await this.categoryModel.findByIdAndUpdate(
      id,
      { name, discription },
      { new: true },
    );
    return updateUser;
  }
}
