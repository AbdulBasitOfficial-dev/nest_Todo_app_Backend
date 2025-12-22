import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, userDocument } from 'src/auth/schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<userDocument>) {}

  //   Get UserBY Id
  async userById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  // Get All User
  async getAllUser() {
    return this.userModel.find().exec();
  }

  // Update User
  async updateUser(
    id: string,
    name: string,
    email: string,
    password: string,
    role?: string,
  ) {
    const existingUser = await this.userModel.findOne({ email });
    if (!existingUser) {
      throw new NotFoundException('Email is Not Vaild');
    }

    const hash = await bcrypt.hash(password, 10);
    const user = await this.userModel
      .findByIdAndUpdate(
        id,
        {
          name,
          email,
          password: hash,
          role,
        },
        {
          new: true,
          setDefaultsOnInsert: true,
        },
      )
      .exec();
    return {
      Message: 'User SignUp Succesfully ',
      data: user,
    };
  }

  // Deleter User
  async userDelete(id: string) {
    const user = await this.userModel.findByIdAndDelete(id).exec();
    if (!user) {
      throw new NotFoundException('User Not Found ');
    }
    return user;
  }
}
