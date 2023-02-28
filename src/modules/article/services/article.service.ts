import { PagerDto } from "@lib/http-infra-lib/dtos/pager.dto";
import { BasePagination } from "@lib/http-infra-lib/response/base-pagination";
import { PagerResult } from "@lib/http-infra-lib/response/pager-result.interface";
import { SELECT } from "@lib/http-infra-lib/utils/common";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { CreateArticleDto } from "../dtos/article-create.dto";
import { ArticleSearchDto } from "../dtos/article-search.dto";
import { Article } from "../schemas/article.schema";
import ArticleSearchService from "./article-search.service"

@Injectable()
export class ArticleService extends BasePagination<Article>{
  private logger = new Logger(ArticleService.name)

  constructor(
    // private readonly articleRepository: ArticleRepository,
    private readonly articleSearchService: ArticleSearchService,
    @InjectModel(Article.name) private readonly articleModel: Model<Article>
  ){super()}

  async findArticles(filterQuery: FilterQuery<Article>, pagerDto: PagerDto): Promise<PagerResult<Article>>{    
    // return await this.articleRepository.findAndPagination({userId, ...searchQuery}, pagerDto)
    const findQuery = this.articleModel
      .find(filterQuery, {}, { lean: true })
      .skip(this.getSkip(pagerDto))
      .limit(this.getTake(pagerDto))

    const results = await findQuery

    const count = await this.articleModel.count(filterQuery)
    return this.getPagerResult(results, count, pagerDto)
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article>{
    const article = await this.articleModel
      .create({ ...createArticleDto, _id: new Types.ObjectId() })

    this.articleSearchService.indexPost(article) 
    return article
  }

  async getArticleById(_id: string): Promise<Article>{
    const article = await this.articleModel.findOne({ _id }).populate({ path: 'user', select: SELECT }).select(SELECT)
    if (!article) throw new NotFoundException(`no article with this _id =${_id}`);
    return article
  }

  async updateNumberOfLikes(_id: string, likes: number): Promise<Article> {
    return await this.findOneAndUpdate({ _id }, { $inc: { likes } })
  }

  async searchForArticles(text: string) {
    const results = await this.articleSearchService.search(text);
    const ids = results.map(result => result.id);
    if (!ids.length) {
      return [];
    }
    return this.articleModel
      .find({
        _id: { $in: ids }
      });
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Article>,
    update: UpdateQuery<Article>,
  ) {
    const document = await this.articleModel.findOneAndUpdate(filterQuery, update, {
      lean: true,
      new: true,
    });

    if (!document) {
      this.logger.warn(`Document not found with filterQuery:`, filterQuery);
      throw new NotFoundException('Document not found.');
    }

    return document;
  }

}