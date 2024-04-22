import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LabService } from './lab.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { rentalLabDto } from 'src/dtos/lab.dto';

@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async rentalLab(@Body() body: rentalLabDto, @User() user) {
    const rentalDate = body.rentalDate;
    const rentalStartTime = body.rentalStartTime;
    const rentalEndTime = body.rentalEndTime;
    const rentalPurpose = body.rentalPurpose;
    const hopeLab = body.hopeLab;
    const reasonRental = body.reasonRental;
    const rentalUser = body.rentalUser;
    const labId = user.id;

    const lab = await this.labService.rentalLab(
      rentalDate,
      rentalStartTime,
      rentalEndTime,
      rentalPurpose,
      hopeLab,
      reasonRental,
      rentalUser,
      labId,
    );

    return lab;
  }
}
