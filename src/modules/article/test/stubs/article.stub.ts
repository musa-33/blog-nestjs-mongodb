import { Article } from "@modules/article/schemas/article.schema"
import { Types } from "mongoose"

export const articleStub = (): any => {
  return {
    _id: '63fc16171f310b5bfc84b7e7',
    title: 'Test',
    content: 'test content',
    category: 1,
    tags: ['tag1', 'tag2'],
    likes: 0,
    user: '63fba375f7559318141d9d8b'
  }
}