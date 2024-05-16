import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LabEntity, approvalStatus } from 'src/entities/lab.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(LabEntity)
    private readonly labRepository: Repository<LabEntity>,
  ) {}
  async cancelRentalLab(labId: string) {
    const cancelResult = await this.labRepository.delete({
      labId: labId,
    });

    return { affected: cancelResult?.affected };
  }

  async permitRentalLab(labId: string) {
    const lab = await this.labRepository.findOne({
      where: { labId: labId },
    });

    if (!lab) {
      throw new NotFoundException('대여를 허용할 수 없습니다.');
    }

    const permitResult = await this.labRepository.update(
      { labId: labId },
      { approvalStatus: approvalStatus.APPROVED },
    );

    return { affected: permitResult?.affected };
  }
}
