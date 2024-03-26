import { Column, Entity, OneToMany } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommentEntity } from './comment.entity';
import { CommonBigPKEntity } from './common.entity';

@Entity('user')
export class UserEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false })
  password: string;

  @Column('int', { unique: false, nullable: true })
  grade: string | null;

  @Column('bigint', { unique: false, nullable: true })
  class: string | null;

  @Column('bigint', { unique: false, nullable: true })
  number: string | null;

  @Column('varchar', { unique: false, nullable: false })
  name: string;

  @Column('varchar', { unique: false, nullable: false })
  email: string;

  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments: CommentEntity[];
}
