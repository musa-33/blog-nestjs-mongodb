import { likeStub } from "@modules/article/test/stubs/like.stub";

export const LikesService = jest.fn().mockReturnValue({
  checkLikeArticle: jest.fn().mockResolvedValue(likeStub()),
  createLikeArticle: jest.fn().mockResolvedValue(likeStub()),
  unLikeArticle: jest.fn().mockResolvedValue({}),
  getAllArticleUserLiked: jest.fn().mockResolvedValue([likeStub()]),
})