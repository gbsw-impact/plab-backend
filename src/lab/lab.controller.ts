import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { LabService } from './lab.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { rentalLabDto } from 'src/dtos/lab.dto';
import { LabInformationEntity } from 'src/entities/lab-info.entity';

@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @UseGuards(JwtAuthGuard)
  @Post('rental')
  async rentalRequest(@Body() body: rentalLabDto, @User() user) {
    const rentalDate = body.rentalDate;
    const rentalStartTime = body.rentalStartTime;
    const rentalEndTime = body.rentalEndTime;
    const rentalPurpose = body.rentalPurpose;
    const hopeLab = body.hopeLab;
    const rentalUser = body.rentalUser;
    const userId = user.id;

    const lab = await this.labService.rentalRequest(
      rentalDate,
      rentalStartTime,
      rentalEndTime,
      rentalPurpose,
      hopeLab,
      rentalUser,
      userId,
    );

    return lab;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('cancel/:userId')
  async cancelRequest(@Param('userId') userId) {
    const lab = await this.labService.cancelRequest(userId);
    return { approvalStatus: lab.approvalStatus, userId };
  }
  @Get('available')
  async getAllLabs(): Promise<LabInformationEntity[]> {
    return await this.labService.getAllLabs();
  }
}
