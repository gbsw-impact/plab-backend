import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { LabEntity, approvalStatus } from 'src/entities/lab.entity';
import { TwilioService } from 'src/twilio/twilio.service';
import { Repository } from 'typeorm';

@Injectable()
export class LabService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
    @InjectRepository(LabInformationEntity)
    private readonly LabInformationEntity: Repository<LabInformationEntity>,
    private readonly twilioservice: TwilioService,
  ) {}
  async rentalRequest(
    rentalDate: Date,
    rentalStartTime: string,
    rentalEndTime: string,
    rentalPurpose: string,
    hopeLab: string,
    rentalUser: string,
    userId: string,
  ) {
    const newRental = this.labRepository.create({
      rentalDate,
      rentalStartTime,
      rentalEndTime,
      rentalPurpose,
      hopeLab,
      rentalUser,
      userId,
      approvalStatus: approvalStatus.WAITING,
    });

    const savedRequest = await this.labRepository.save(newRental);

    const adminPhoneNumber = '+8201047632364';
    const message = `새로운 실습실 대여 요청이 있습니다.`;

    await this.twilioservice.sendSms(adminPhoneNumber, message);

    return savedRequest;
  }

  async cancelRequest(userId: string) {
    const req = await this.labRepository.findOne({ where: { userId: userId } });

    req.approvalStatus = approvalStatus.WAITING;

    const savedRequest = await this.labRepository.save(req);

    const adminPhoneNumber = '+8201047632364';
    const message = `새로운 실습실 대여 취소 요청이 있습니다.`;

    await this.twilioservice.sendSms(adminPhoneNumber, message);

    return savedRequest
  }

  async getAllLabs(): Promise<LabInformationEntity[]> {
    return await this.LabInformationEntity.find({
      where: {
        Available: true,
      },
    });
  }
}
