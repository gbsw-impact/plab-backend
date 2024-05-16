import { Column, Entity, OneToMany } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CommonBigPKEntity } from './common.entity';
import { UserAuthority } from './user-authority.entity';
import { CommentEntity } from './comment.entity';

@Entity('user')
export class UserEntity extends CommonBigPKEntity {
  @Column('varchar', { unique: false, nullable: false, length: 255 })
  password: string;

  @Column('int', { unique: false, nullable: true })
  grade: string | null;

  @Column('bigint', { unique: false, nullable: true })
  class: string | null;

  @Column('bigint', { unique: false, nullable: true })
  number: string | null;

  @Column('varchar', { unique: false, nullable: false, length: 50 })
  userid: string;

  @Column('varchar', { unique: false, nullable: true, length: 50 })
  name: string;

  @OneToMany(() => ArticleEntity, (article) => article.user)
  articles: ArticleEntity[];

  @OneToMany(() => CommentEntity, (article) => article.user)
  comments: ArticleEntity[];

  @OneToMany(() => UserAuthority, (userAuthority) => userAuthority.user, {
    eager: true,
  })
  authorities?: any[];
}
