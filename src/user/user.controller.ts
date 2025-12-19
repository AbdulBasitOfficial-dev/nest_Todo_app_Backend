import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/Guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //   Find By Id
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
}
