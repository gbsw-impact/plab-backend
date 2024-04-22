import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommonBigPKEntity } from './common.entity';

enum approvalStatus {
  WAITING = 'WAITING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

@Entity('Lab')
export class LabEntity extends CommonBigPKEntity {
  @Column('date', { nullable: false })
  rentalDate: Date;

  @Column('varchar', { nullable: false, length: 5 })
  rentalStartTime: string;

  @Column('varchar', { nullable: false, length: 5 })
  rentalEndTime: string;

  @Column('varchar', { nullable: false, length: 100 })
  rentalPurpose: string;

  @Column('varchar', { nullable: false, length: 20 })
  hopeLab: string;

  @Column('varchar', { nullable: true, length: 200 })
  reasonRental: string;

  @Column('int', { unique: false, nullable: false })
  labId: string;

  @Column('varchar', { nullable: false, length: 100 })
  rentalUser: string;

  @Column({
    type: 'enum',
    enum: approvalStatus,
  })
  approvalStatus: approvalStatus;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'labId', referencedColumnName: 'id' })
  user: UserEntity;
}
