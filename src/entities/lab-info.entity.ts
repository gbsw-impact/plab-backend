import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Labinfo')
export class LabInformationEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', { nullable: false, unique: true })
  labName: string;

  @Column('boolean', { nullable: false, default: true })
  Available: boolean;

}
