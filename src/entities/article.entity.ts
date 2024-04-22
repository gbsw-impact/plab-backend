import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { IsString } from 'class-validator';

@Entity('Article')
export class ArticleEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false, length: 1000 })
  content: string;

  @IsString()
  @Column('varchar', { unique: false, nullable: false, length: 50 })
  title: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;
}
