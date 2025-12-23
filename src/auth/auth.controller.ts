import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../user/dto/login.user.dto';
import { CreateUserDto } from '../user/dto/create.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   SignUp
  @Post('signUp')
  async SignUp(
    @Body()
    body: CreateUserDto,
  ) {
    return this.authService.signUpUser(
      body.name,
      body.email,
      body.password,
      body.role,
    );
  }

  //   Login
  @Post('login')
  async Login(@Body() body: LoginUserDto) {
    return this.authService.LoginUser(body.email, body.password);
  }
}
