import { PagerDto } from "@lib/http-infra-lib/dtos/pager.dto";
import { BasePagination } from "@lib/http-infra-lib/response/base-pagination";
import { PagerResult } from "@lib/http-infra-lib/response/pager-result.interface";
import { SELECT } from "@lib/http-infra-lib/utils/common";
import { AbstractRepository } from "@modules/database/abstract.repository";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CreateArticleDto } from "../dtos/article-create.dto";
import { Article } from "../schemas/article.schema";

@Injectable()
export class ArticleRepository extends AbstractRepository<Article>{
  protected readonly logger: Logger = new Logger(ArticleRepository.name)

  constructor(@InjectModel(Article.name) private articleModel: Model<Article>) {
    super(articleModel)
  }

  async createArticle(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleModel
      .create({ ...createArticleDto, _id: new Types.ObjectId() })
  }

  async getArticleById(_id: string): Promise<Article> {
    const article = await this.articleModel.findOne({ _id }).populate({ path: 'user', select: SELECT }).select(SELECT)
    if (!article) throw new NotFoundException(`no article with this _id =${_id}`);
    return article
  }

  async updateNumberOfLikes(_id: string, likes: number): Promise<Article> {
    return await this.articleModel.findByIdAndUpdate({ _id }, { $inc: { likes } }, { new: true }) // new: true to return with new data 
    // return await articleR
  }
}