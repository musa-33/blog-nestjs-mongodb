import { User } from "@modules/users/schemas/user.schema";
import { userStub } from "@modules/users/test/stubs/user.stub";
import { Test } from "@nestjs/testing"
import { FilterQuery } from "mongoose";
import { CreateLikeDto } from "../dtos/like-create.dto";
import { Article } from "../schemas/article.schema";
import { Like } from "../schemas/like.schema"
import { LikesService } from "../services/like.service";
import { articleStub } from "./stubs/article.stub";
import { likeStub } from "./stubs/like.stub";

jest.mock('../services/like.service')

describe('LikeService', () => {
  let likeService: LikesService
  let likeFilterQuery: FilterQuery<Like>
  
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [],
      providers: [
        LikesService
      ]
    })
      .compile();

    likeService = moduleRef.get<LikesService>(LikesService)

    likeFilterQuery = {
      _id: likeStub()._id
    }
    jest.clearAllMocks();
  })

  describe('checkLikeArticle', () => {
    describe('when checkLikeArticle is called', () => {
      let like: Like
      let user: User
      let article: Article

      beforeEach(async () => {
        user = userStub()
        article = articleStub()

        jest.spyOn(likeService, 'checkLikeArticle')
        like = await likeService.checkLikeArticle(user._id.toString(), article._id.toString())
      })

      test('then it should call likeModel', () => {
        expect(likeService.checkLikeArticle).toHaveBeenCalledWith(user._id.toString(), article._id.toString());
      })

      test('then it should return like', () => {
        expect(like).toEqual(likeStub())
      })
      it('should be defined likeService', () => {
        expect(likeService).toBeDefined();
      });
    })
  })

  describe('createLikeArticle', () => {
    describe('when checkLikeArticle is called', () => {
      let like: Like
      let createLikeDto: CreateLikeDto
      let user: User
      let article: Article

      beforeEach(async () => {
        user = userStub()
        article = articleStub()
        createLikeDto = {
          article: article._id.toString(),
          user: user._id.toString()
        }

        jest.spyOn(likeService, 'createLikeArticle')
        like = await likeService.createLikeArticle(createLikeDto)
      })

      test('then it should call likeModel', () => {
        expect(likeService.createLikeArticle).toHaveBeenCalledWith(createLikeDto)
      })

      test('then it should return like', () => {
        expect(like).toEqual(likeStub())
      })

      it('should be defined likeService', () => {
        expect(likeService).toBeDefined();
      });
    })
  })

  describe('getAllArticleUserLiked', () => {
    describe('when checkLikeArticle is called', () => {
      let like: Like[]
      let user: User

      beforeEach(async () => {
        user = userStub()
        jest.spyOn(likeService, 'getAllArticleUserLiked')
        like = await likeService.getAllArticleUserLiked(user._id.toString())
      })

      test('then it should call likeModel', () => {
        expect(likeService.getAllArticleUserLiked).toHaveBeenCalledWith(user._id.toString())
      })

      test('then it should return all likes by a user', () => {
        expect(like).toEqual([likeStub()])
      })

      it('should be defined likeService', () => {
        expect(likeService).toBeDefined();
      });
    })
  })

  describe('unLikeArticle', () => {
    describe('when unLikeArticle is called', () => {
      let like: Like
      beforeEach(async () => {
        jest.spyOn(likeService, 'unLikeArticle')
        like = await likeService.unLikeArticle(likeFilterQuery)
      })

      test('then it should call likeModel', () => {
        expect(likeService.unLikeArticle).toHaveBeenCalledWith(likeFilterQuery)
      })

      test('then it should return empty data', () => {
        expect(like).toEqual({})
      })

      it('should be defined likeService', () => {
        expect(likeService).toBeDefined();
      });
    })
  })
})