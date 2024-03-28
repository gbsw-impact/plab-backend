// lab.dto.ts

import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { LabEntity } from 'src/entities/lab.entity';

export class LabDto extends LabEntity {
  @IsDate()
  @IsNotEmpty()
  rentalDate: Date;

  @IsString()
  @IsNotEmpty()
  rentalTime: string;

  @IsString()
  @IsNotEmpty()
  rentalPurpose: string;

  @IsString()
  @IsNotEmpty()
  hopeLab: string;

  @IsString()
  @IsNotEmpty()
  reasonRental: string;
}
