import { PickType } from '@nestjs/swagger';
import { LabEntity } from 'src/entities/lab.entity';

export class rentalLabDto extends PickType(LabEntity, [
  'reasonRental',
  'rentalDate',
  'rentalUser',
  'rentalEndTime',
  'rentalStartTime',
  'reasonRental',
  'rentalPurpose',
  'hopeLab',
  'labId',
]) {}
