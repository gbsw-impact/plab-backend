import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CommonBigPKEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { CommentEntity } from './comment.entity';

@Entity('Article')
export class ArticleEntity extends CommonBigPKEntity {
  @Column('text', { unique: false, nullable: false })
  content: string;

  @Column('varchar', { unique: false, nullable: false })
  title: string;

  @Column('bigint', { unique: false, nullable: false })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.articles)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.article)
  comments: CommentEntity[];
}
