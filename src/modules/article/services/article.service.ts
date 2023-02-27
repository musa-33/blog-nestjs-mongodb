import { PagerDto } from "@lib/http-infra-lib/dtos/pager.dto";
import { PagerResult } from "@lib/http-infra-lib/response/pager-result.interface";
import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "../dtos/article-create.dto";
import { ArticleSearchDto } from "../dtos/article-search.dto";
import { ArticleRepository } from "../repositories/article.repository";
import { Article } from "../schemas/article.schema";
import ArticleSearchService from "./article-search.service"

@Injectable()
export class ArticleService{

  constructor(
    // @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly articleRepository: ArticleRepository,
    private readonly articleSearchService: ArticleSearchService,
  ){}

  async findArticles(userId: string, pagerDto: PagerDto, searchQuery: ArticleSearchDto): Promise<PagerResult<Article>>{    
    return await this.articleRepository.findAndPagination({userId, ...searchQuery}, pagerDto)
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article>{
    const article = await this.articleRepository.createArticle(createArticleDto)
    this.articleSearchService.indexPost(article) 
    return article
  }

  async getArticleById(_id: string): Promise<Article>{
    return await this.articleRepository.getArticleById(_id)
  }

  async updateNumberOfLikes(_id: string, likes: number): Promise<Article> {
    return await this.articleRepository.findOneAndUpdate({ _id }, { $inc: { likes } })
  }

  async searchForArticles(text: string) {
    const results = await this.articleSearchService.search(text);
    const ids = results.map(result => result.id);
    if (!ids.length) {
      return [];
    }
    return this.articleRepository
      .find({
        _id: { $in: ids }
      });
  }

}