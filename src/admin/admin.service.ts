import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabInformationEntity } from 'src/entities/lab-info.entity';
import { LabEntity, approvalStatus } from 'src/entities/lab.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
    @InjectRepository(LabInformationEntity)
    private readonly labInformationRepository: Repository<LabInformationEntity>,
  ) {}
  async cancelRentalLab(userId: string) {
    const lab = await this.labRepository.findOne({
      where: { userId: userId },
    });

    const labInfo = await this.labInformationRepository.findOne({
      where: { labName: lab.hopeLab },
    });
    const deleteLab = await this.labRepository.delete({
      userId: userId,
    });
    if (labInfo) {
      await this.labInformationRepository.remove(labInfo);
    }
    return { affected: deleteLab?.affected, labInfo };
  }

  async permitRentalLab(userId: string) {
    const lab = await this.labRepository.findOne({
      where: { userId: userId },
    });

    const permitResult = await this.labRepository.update(
      { userId: userId },
      { approvalStatus: approvalStatus.APPROVED },
    );

    const labInfo = await this.labInformationRepository.create({
      labName: lab.hopeLab,
      Available: false,
    });
    const saveInfo = await this.labInformationRepository.save(labInfo);
    return { affected: permitResult?.affected, saveInfo };
  }

  async getRequest(): Promise<LabEntity[]> {
    return this.labRepository.find({
      where: {
        approvalStatus: approvalStatus.WAITING,
      },
    });
  }
}
