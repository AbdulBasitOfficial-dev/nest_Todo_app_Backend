import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   SignUp
  @Post('signUp')
  async SignUp(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      role?: string;
    },
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
  async Login(@Body() body: { email: string; password: string }) {
    return this.authService.LoginUser(body.email, body.password);
  }
}
