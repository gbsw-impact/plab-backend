import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { CommonBigPKEntity } from './common.entity';
import { UserEntity } from './user.entity';
import { ArticleEntity } from './article.entity';

@Entity('Comment')
export class CommentEntity extends CommonBigPKEntity {
  @Column('text', { nullable: false })
  content: string;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  user: UserEntity;

  @ManyToOne(() => ArticleEntity, (article) => article.comments)
  @JoinColumn({ name: 'articleId', referencedColumnName: 'id' })
  article: ArticleEntity;

  @Column('bigint', { nullable: false })
  parentCommentId: string;
}
