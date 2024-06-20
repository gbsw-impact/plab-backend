import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleType } from 'src/auth/role.type';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('/:userId')
  @UseGuards(LocalAuthGuard, RolesGuard, JwtAuthGuard)
  @Roles(RoleType.ADMIN)
  async deleteLab(@Param('userId') userId) {
    const res = await this.adminService.cancelRentalLab(userId);
    return res;
  }

  @Patch('/:userId')
  @UseGuards(LocalAuthGuard, RolesGuard, JwtAuthGuard)
  @Roles(RoleType.ADMIN)
  async updateLab(@Param('userId') userId) {
    const res = await this.adminService.permitRentalLab(userId);
    return res;
  }

  @Get('/rental')
  @UseGuards(LocalAuthGuard, RolesGuard, JwtAuthGuard)
  @Roles(RoleType.ADMIN)
  async getRentalRequests() {
    const req = await this.adminService.getRequest();
    return req;
  }
}
