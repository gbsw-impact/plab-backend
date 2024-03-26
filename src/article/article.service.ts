import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleEntity } from 'src/entities/article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
  ) {}
  async createArticle(title: string, content: string, userId: string) {
    await this.articleRepository.save({
      title: title,
      content: content,
      userId: userId,
    });

    return this.articleRepository;
  }

  async getArticle(articleId: string) {
    const article = await this.articleRepository.findOne({
      where: {
        id: articleId,
      },
    });

    return article;
  }

  async modifyArticle(
    articleId: string,
    title: string,
    content: string,
    userId: string,
  ) {
    const article = await this.articleRepository.findOne({
      where: {
        id: articleId,
        userId: userId,
      },
    });

    if (!article) {
      throw new UnauthorizedException('본인의 게시글이 아닙니다.');
    }

    const updateResult = await this.articleRepository.update(
      { id: articleId },
      {
        title: title,
        content: content,
      },
    );

    return { affected: updateResult?.affected };
  }
}
