import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Lab-info')
export class LabInformationEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  labName: string;

  @Column('boolean', { nullable: false, default: true })
  Available: boolean;

}
