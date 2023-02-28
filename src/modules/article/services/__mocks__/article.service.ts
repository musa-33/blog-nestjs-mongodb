import { articleStub } from "@modules/article/test/stubs/article.stub";

export const ArticleService = jest.fn().mockReturnValue({
  findArticles: jest.fn().mockResolvedValue([articleStub()]),
  createArticle: jest.fn().mockResolvedValue(articleStub()),
  getArticleById: jest.fn().mockResolvedValue(articleStub()),
  updateNumberOfLikes: jest.fn().mockResolvedValue(articleStub())
})