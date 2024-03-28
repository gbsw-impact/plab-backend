import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from './user.entity';
import { CommonBigPKEntity } from './common.entity';

@Entity('Lab')
export class LabEntity extends CommonBigPKEntity {
  @Column('date', { nullable: false })
  rentalDate: Date;

  @Column('varchar', { nullable: false }) // rentalTime의 데이터 타입을 varchar로 변경
  rentalTime: string; // 문자열(string) 형식으로 변경하여 hh:mm:ss 형식으로 저장

  @Column('varchar', { nullable: false })
  rentalPurpose: string;

  @Column('varchar', { nullable: false })
  hopeLab: string;

  @Column('varchar', { nullable: true })
  reasonRental: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
