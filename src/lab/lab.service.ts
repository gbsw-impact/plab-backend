// lab.service.ts

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
    rentalTime: string,
    rentalPurpose: string,
    hopeLab: string,
    reasonRental: string,
    userId: string,
  ) {
    const lab = await this.labRepository.save({
      rentalDate: rentalDate,
      rentalTime: rentalTime,
      rentalPurpose: rentalPurpose,
      hopeLab: hopeLab,
      reasonRental: reasonRental,
      userId: userId,
    });

    return lab;
  }
}
