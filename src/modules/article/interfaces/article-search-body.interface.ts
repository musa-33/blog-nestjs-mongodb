import { User } from "@modules/users/schemas/user.schema";

export interface ArticleSearchBody {
  _id: string,
  title: string,
  content: string,
  user: User | string
}