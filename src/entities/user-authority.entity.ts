import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

enum RoleType {
  USER = 'ROLE_USER',
  ADMIN = 'ROLE_ADMIN',
}

@Entity()
export class UserAuthority {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: RoleType,
  })
  authority_name: RoleType;

  @Column('varchar', { name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.authorities)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
