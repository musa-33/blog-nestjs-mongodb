
import { SearchModule } from "@modules/elasticsearch/elasticsearch.module";
import { UsersModule } from "@modules/users/users.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleController } from "./controllers/article.controller";
import { ArticleRepository } from "./repositories/article.repository";
import { Article, ArticleSchema } from "./schemas/article.schema";
import { Like, LikeSchema } from "./schemas/like.schema";
import ArticleSearchService from "./services/article-search.service";
import { ArticleService } from "./services/article.service";
import { LikesService } from "./services/like.service";

@Module({
  imports: [
    SearchModule,
    UsersModule,
    JwtModule,
    MongooseModule.forFeature([
      {name: Article.name, schema: ArticleSchema},
      {name: Like.name, schema: LikeSchema},
    ]),
  ],
  providers: [ArticleService, LikesService, ArticleRepository, ArticleSearchService],
  controllers: [ArticleController],
  exports: [ArticleService, ArticleRepository, LikesService, ArticleSearchService]
})

export class ArticleModule{}