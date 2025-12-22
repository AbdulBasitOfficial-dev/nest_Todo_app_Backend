import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/Guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { CreateUserDto } from './dto/create.user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   Find By Id
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.userService.userById(id);
  }

  // Get All User
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }

  // Update User
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() body: CreateUserDto) {
    return this.userService.updateUser(
      id,
      body.name,
      body.email,
      body.password,
      body.role,
    );
  }

  // Delete user
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin')
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const DeleteUser = await this.userService.userDelete(id);

    return {
      Message: 'User Delete Successfully',
      Data: DeleteUser,
    };
  }
}
