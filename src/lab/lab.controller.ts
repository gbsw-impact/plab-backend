import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LabService } from './lab.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('lab')
export class LabController {
  constructor(private readonly labService: LabService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async rentalLab(@Body() body, @User() user) {
    const userId = user.id;

    const rentalDate = body.rentalDate;
    const rentalTime = body.rentalTime;
    const rentalPurpose = body.rentalPurpose;
    const hopeLab = body.hopeLab;
    const reasonRental = body.reasonRental;

    const rentalLab = await this.labService.rentalLab(
      rentalDate,
      rentalTime,
      rentalPurpose,
      hopeLab,
      reasonRental,
      userId,
    );

    return rentalLab;
  }
}
