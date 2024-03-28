import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './User.Service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/main')
  async getMainPage() {
    return this.userService.getMainPage();
  }

  @Post('register')
  async register(@Body() body) {
    const email = body?.email;
    const password = body?.password;
    const name = body?.name;
    return this.userService.register(email, password, name);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-info')
  async getUserInfo() {
    return 'my page';
  }
}
