import { PagerDto } from "@lib/http-infra-lib/dtos/pager.dto"
import { PagerResult } from "@lib/http-infra-lib/response/pager-result.interface";
import { JwtService } from "@nestjs/jwt";
import { getModelToken } from "@nestjs/mongoose";
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose";
import { CreateArticleDto } from "../dtos/article-create.dto";
import { ArticleSearchDto } from "../dtos/article-search.dto";
import { Article } from "../schemas/article.schema";
import { ArticleService } from "../services/article.service";
import { articleStub } from "./stubs/article.stub";
import { ArticleModel } from "./supports/article.model";

jest.mock('../services/article.service')

describe('ArticleService', () => {
  let articleService: ArticleService
  let articleModel: ArticleModel
  let articleFilterQuery: FilterQuery<Article>

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        ArticleService,
        JwtService,
        {
          provide: getModelToken(Article.name),
          useClass: ArticleModel
        }
      ]
    })
      .compile();

    articleService = moduleRef.get<ArticleService>(ArticleService)
    articleModel = moduleRef.get<ArticleModel>(getModelToken(Article.name))

    articleFilterQuery = {
      _id: articleStub()._id
    }

    jest.clearAllMocks();
  })

  describe('createArticle', () => {
    describe('when createArticle is called', () => {
      let article: any;
      let createArticleDto: CreateArticleDto

      beforeEach(async () => {
        createArticleDto = {
          title: articleStub().title,
          content: articleStub().content,
          category: articleStub().category,
          tags: articleStub().tags,
          user: articleStub().user.toString()
        }
        article = await articleService.createArticle(createArticleDto)
      })

      test('then it should call articleModel', () => {
        expect(articleService.createArticle).toHaveBeenCalledWith({ ...createArticleDto });
      })

      test('then it should return a article', () => {
        expect(article).toEqual(articleStub())
      })
    })
  })

  describe('getArticleById', () => {
    describe('when getArticleById is called', () => {
      let article: Article;

      beforeEach(async () => {
        jest.spyOn(articleService, 'getArticleById')
        article = await articleService.getArticleById(articleStub()._id)
      })

      test('then it should call articleModel', () => {
        expect(articleService.getArticleById).toBeCalledWith(articleStub()._id);
      })

      test('then is should return a article', () => {
        expect(article).toEqual(articleStub());
      })
    })
  })

  describe('findArticles', () => {
    describe('when findArticles is called', () => {
      let article: PagerResult<Article>;
      let searchQuery: ArticleSearchDto
      let pagerDto: PagerDto

      beforeEach(async () => {
        searchQuery = {
          category: articleStub().category,
          tags: articleStub().tags[0]
        }
        pagerDto = {
          perPage: 10,
          pageNumber: 1
        }
        jest.spyOn(articleService, 'findArticles')
        article = await articleService.findArticles({ user: articleStub().user, ...searchQuery}, pagerDto)
      })

      test('then it should call articleModel', () => {
        expect(articleService.findArticles).toBeCalledWith({ user: articleStub().user, ...searchQuery }, pagerDto);
      })

      test('then is should return a articles', () => {
        expect(article).toEqual([articleStub()]);
      })
    })
  })


  describe('updateNumberOfLikes', () => {
    describe('when updateNumberOfLikes is called', () => {
      let article: Article

      beforeEach(async () => {
        article = await articleService.updateNumberOfLikes(articleStub()._id, 1)
      })

      test('then it should call the articleModel', () => {
        expect(articleService.updateNumberOfLikes).toHaveBeenCalledWith(articleStub()._id, 1);
      })

      test('then it should return a user', () => {
        expect(article).toEqual(articleStub())
      })
    })
  })
})