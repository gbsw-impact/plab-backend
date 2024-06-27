import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommonBigPKEntity } from './common.entity';

export enum approvalStatus {
  WAITING = 'WAITING',
  APPROVED = 'APPROVED',
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

  @Column('int', { unique: false, nullable: false })
  userId: string;

  @Column('varchar', { nullable: false, length: 100 })
  rentalUser: string;

  @Column({
    type: 'enum',
    enum: approvalStatus,
  })
  approvalStatus: approvalStatus;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
