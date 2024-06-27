import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleType } from './role.type';
import { LoginDto } from 'src/dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Body() loginDto: LoginDto) {
   const loginUser = await this.authService.logIn(loginDto);
   return loginUser;
  }

  @Get('/authenticate')
  @UseGuards(LocalAuthGuard)
  isAuthenticated(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }

  @Get('/admin-role')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  adminRole(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}
