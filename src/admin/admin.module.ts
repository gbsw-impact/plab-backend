import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabEntity } from 'src/entities/lab.entity';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmModule.forFeature([LabEntity])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class adminModule {}
