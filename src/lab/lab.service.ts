import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { LabEntity, approvalStatus } from 'src/entities/lab.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LabService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
    @InjectRepository(LabInformationEntity)
    private readonly LabInformatuonEntity: Repository<LabInformationEntity>,
  ) {}
  async rentalRequest(
    rentalDate: Date,
    rentalStartTime: string,
    rentalEndTime: string,
    rentalPurpose: string,
    hopeLab: string,
    reasonRental: string,
    rentalUser: string,
    userId: string,
  ) {
    const newRental = this.labRepository.create({
      rentalDate,
      rentalStartTime,
      rentalEndTime,
      rentalPurpose,
      hopeLab,
      reasonRental,
      rentalUser,
      userId,
      approvalStatus: approvalStatus.WAITING,
    });

    return await this.labRepository.save(newRental);
  }

  async getAllLabs(): Promise<LabInformationEntity[]> {
    return await this.LabInformatuonEntity.find({
      where: {
        Available: true,
      },
    });
  }
}
