import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';
import { CreateArticleDto } from 'src/dtos/article/create-article.dto';
import { HttpExceptionFilter } from 'src/filter/http-exception.filter';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createArticle(@Body() body: CreateArticleDto, @User() user) {
    const userId = user.id;

    const title = body.title;
    const content = body.content;

    const article = await this.articleService.createArticle(
      title,
      content,
      userId,
    );

    return article;
  }
  @UseFilters(HttpExceptionFilter)
  @Get('/:id')
  async readArticle(@Param('id') id) {
    const articleId = id;

    const article = await this.articleService.getArticle(articleId);

    return article;
  }

  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async updateArticle(@Param('id') id, @User() user, @Body() body) {
    const userId = user.id;
    const articleId = id;

    const title = body.title;
    const content = body.content;

    const res = await this.articleService.modifyArticle(
      userId,
      articleId,
      title,
      content,
    );

    return res;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async deleteArticle(@Param('id') id, @User() user) {
    const userId = user.id;
    const articleId = id;

    const res = await this.articleService.removeArticle(userId, articleId);

    return res;
  }
}
