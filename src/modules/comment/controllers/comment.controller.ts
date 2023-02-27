import { SuccessResponse } from '@lib/http-infra-lib/response/success-response.interface';
import { ResponseUtil } from '@lib/http-infra-lib/utils/response.util';
import { ArticleService } from '@modules/article/services/article.service';
import { GetUserContext } from '@modules/auth/decorators/user-context.decorator';
import { AuthenticatedGuard } from '@modules/auth/guards/authenticated.guard';
import { UserContext } from '@modules/users/interfaces/user.interface';
import { Controller, Get, Post, Body, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCommentDto } from '../dtos/create-ticket.dto';
import { Comment } from '../schemas/comment.schema';
import { CommentsService } from '../services/comment.service';

@UseGuards(AuthenticatedGuard)
@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentService: CommentsService,
    private readonly articlesService: ArticleService,
  ) { }

  @Post('articles/:_id')
  async createArticle(
    @GetUserContext() user: UserContext,
    @Param('_id') articleId: string,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<SuccessResponse<Comment>> {
    await this.articlesService.getArticleById(articleId)
    const comment = await this.commentService.createComment({ ...createCommentDto, article: articleId, user: user._id })
    return ResponseUtil.success(comment, 'Comment created successfully')
  }

  @Get("articles/:_id")
  async getAllCommentsOnArticles(
    @GetUserContext() user: UserContext,
    @Param('_id') articleId: string,
    @Body() createCommentDto: CreateCommentDto
  ) {
    const data = await this.commentService.getAllCommentsOnArticles(articleId)
    if (data && data.length === 0) throw new NotFoundException('No comments on this articles to show')
    return {
      count: data.length,
      data
    }
  }
}
