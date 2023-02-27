import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { ArticleSearchBody } from "../interfaces/article-search-body.interface";
import { ArticleSearchResult } from "../interfaces/article-search-result.interface";
import { Article } from "../schemas/article.schema";

@Injectable()
export default class ArticleSearchService {
  index = 'articles'

  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) { }



  async indexPost(article: Article) {
    return this.elasticsearchService.index<ArticleSearchResult, ArticleSearchBody>({
      index: this.index,
      body: {
        _id: article._id.toString(),
        title: article.title,
        content: article.content,
        user: article.user
      }
    })
  }

  async search(text: string) {
    const { body } = await this.elasticsearchService.search<ArticleSearchResult>({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['title', 'content']
          }
        }
      }
    })
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }

  async remove(articleId: number) {
    this.elasticsearchService.deleteByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: articleId,
          }
        }
      }
    })
  }

  async update(article: Article) {
    const newBody: ArticleSearchBody = {
      _id: article._id.toString(),
      title: article.title,
      content: article.content,
      user: article.user
    }

    const script = Object.entries(newBody).reduce((result, [key, value]) => {
      return `${result} ctx._source.${key}='${value}';`;
    }, '');

    return this.elasticsearchService.updateByQuery({
      index: this.index,
      body: {
        query: {
          match: {
            id: article._id.toString(),
          }
        },
        script: {
          inline: script
        }
      }
    })
  }
}