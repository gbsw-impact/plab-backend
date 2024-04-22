import { Module } from '@nestjs/common';
import { LabController } from './lab.controller';
import { LabService } from './lab.service';
import { LabEntity } from 'src/entities/lab.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LabEntity])],
  controllers: [LabController],
  providers: [LabService],
})
export class LabModule {}
