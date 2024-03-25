import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('Lab')
export class LabEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: string;

  @Column('datetime', { nullable: false })
  rentalTime: Date;

  @Column('time', { nullable: false })
  rentalDate: Date;

  @Column('varchar', { unique: false, nullable: false })
  rentalPurpose: string;

  @Column('varchar', { unique: false, nullable: false })
  hopeLab: string;

  @Column('varchar', { unique: false, nullable: false })
  headCount: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
