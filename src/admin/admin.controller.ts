import { Controller, Delete, Param, Patch, UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { RoleType } from 'src/auth/role.type';
import { AdminService } from './admin.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Delete('/:labId')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async deleteLab(@Param('labId') id) {
    const labId = id;
    const res = await this.adminService.cancelRentalLab(labId);
    return res;
  }

  @Patch('/:labId')
  @UseGuards(LocalAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  async updateLab(@Param('labId') id) {
    const labId = id;
    const res = await this.adminService.permitRentalLab(labId);
    return res;
  }
}
