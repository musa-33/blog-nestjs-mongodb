
import { UsersModule } from "@modules/users/users.module";
import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { ArticleController } from "./controllers/article.controller";
import { ArticleRepository } from "./repositories/article.repository";
import { Article, ArticleSchema } from "./schemas/article.schema";
import { Like, LikeSchema } from "./schemas/like.schema";
import { ArticleService } from "./services/article.service";
import { LikesService } from "./services/like.service";

@Module({
  imports: [
    UsersModule,
    JwtModule,
    MongooseModule.forFeature([
      {name: Article.name, schema: ArticleSchema},
      {name: Like.name, schema: LikeSchema},
    ]),
  ],
  providers: [ArticleService, LikesService, ArticleRepository],
  controllers: [ArticleController],
  exports: [ArticleService, ArticleRepository, LikesService]
})

export class ArticleModule{}