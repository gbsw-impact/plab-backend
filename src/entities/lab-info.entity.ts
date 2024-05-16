import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LabEntity } from './lab.entity';

@Entity('Lab-info')
export class LabInformationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { nullable: false })
  labName: string;

  @Column('varchar', { nullable: false })
  location: string;

  @Column('boolean', { nullable: false, default: true })
  Available: boolean;

  @OneToOne(() => LabEntity)
  @JoinColumn({ name: 'labId', referencedColumnName: 'id' })
  user: LabEntity;
}
