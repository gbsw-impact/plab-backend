import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabEntity } from 'src/entities/lab.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
  ) {}
  async rentalLab(
    rentalDate: Date,
    rentalStartTime: string,
    rentalEndTime: string,
    rentalPurpose: string,
    hopeLab: string,
    reasonRental: string,
    rentalUser: string,
    labId: string,
  ) {
    const lab = await this.labRepository.save({
      rentalDate: rentalDate,
      rentalStartTime: rentalStartTime,
      rentalEndTime: rentalEndTime,
      rentalPurpose: rentalPurpose,
      hopeLab: hopeLab,
      reasonRental: reasonRental,
      rentalUser: rentalUser,
      labId: labId,
    });

    return lab;
  }
}
