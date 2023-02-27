import { PagerDto } from "@lib/http-infra-lib/dtos/pager.dto";
import { PagerResult } from "@lib/http-infra-lib/response/pager-result.interface";
import { SuccessResponse } from "@lib/http-infra-lib/response/success-response.interface";
import { ResponseUtil } from "@lib/http-infra-lib/utils/response.util";
import { GetUserContext } from "@modules/auth/decorators/user-context.decorator";
import { AuthenticatedGuard } from "@modules/auth/guards/authenticated.guard";
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CreateArticleDto } from "../dtos/article-create.dto";
import { ArticleSearchDto } from "../dtos/article-search.dto";
import { UserContext } from "../../users/interfaces/user.interface";
import { Article } from "../schemas/article.schema";
import { ArticleService } from "../services/article.service";
import { UserService } from "@modules/users/services/user.service";
import { LikesService } from "../services/like.service";


@UseGuards(AuthenticatedGuard)
@Controller('articles')
export class ArticleController{
  constructor(
    private readonly articleService: ArticleService,
    private readonly likesService: LikesService,
    private readonly userService: UserService
  ){}
  
  @Get('dashboard')
  async getAllArticleUserLiked(
    @GetUserContext() user: UserContext,
  ): Promise<SuccessResponse<any>> {
    const likedArticle = await this.likesService.getAllArticleUserLiked(user._id)
    return ResponseUtil.success(likedArticle, 'Article list that user liked.')
  }

  @Post()
  async createArticle(
    @GetUserContext() user: UserContext,
    @Body() createArticleDto: CreateArticleDto
  ): Promise<SuccessResponse<Article>>{
    createArticleDto.user = user._id
    const article = await this.articleService.createArticle(createArticleDto)
    return ResponseUtil.success(article, 'Article has been created successfully.')
  }

  @Get(':_id')
  async findOneArticle(@Param() _id: string):Promise<SuccessResponse<Article>>{
    const article = await this.articleService.getArticleById(_id)
    return ResponseUtil.success(article, 'Article details')
  }

  @Get()
  async getAllArticles(
    @GetUserContext() user: UserContext,
    @Query() searchQuery: ArticleSearchDto,
    @Query() pagerDto: PagerDto
  ): Promise<PagerResult<Article>>{
    const { data, pagerOptions } = await this.articleService.findArticles(user._id, pagerDto, searchQuery)
    return ResponseUtil.success(data, 'All articles', pagerOptions)
  }

  @Post(':_id/like')
  async likeArticleById(
    @GetUserContext() user: UserContext,
    @Param() _id: string
  ): Promise<SuccessResponse<null>>{
    await this.articleService.getArticleById(_id)

    const checkLikeArticle =  await this.likesService.checkLikeArticle(user._id, _id)
    if (checkLikeArticle) throw new BadRequestException('You have already liked this article')

    const data = await this.likesService.createLikeArticle({user: user._id, article: _id})
    if (!data) throw new BadRequestException('can\'t like this article please try again')
    else await this.articleService.updateNumberOfLikes(_id, 1)

    return ResponseUtil.success(null, 'Like article.')
  }

  @Delete(':_id/like')
  async unLikeArticle(
    @GetUserContext() user: UserContext,
    @Param() _id: string
  ): Promise<SuccessResponse<null>> {
    await this.articleService.getArticleById(_id)
    const data = await this.likesService.checkLikeArticle(user._id, _id)
    if (!data) throw new BadRequestException('You didn\'t like this article before')

    await this.likesService.unLikeArticle(data._id)
    await this.articleService.updateNumberOfLikes(_id, -1)
    return ResponseUtil.success(null, 'unLiked successfully')
  }

  @Get(':_id')
  async getAllLikeOnArticle(
    @Param() _id: string
  ){
    const data = await this.likesService.getAllLikeOnArticle(_id)
    return {
      count: data.length,
      data
    }
  }
}