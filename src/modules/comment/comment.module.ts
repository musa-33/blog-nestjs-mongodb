import { NOTIFICATION } from '@lib/http-infra-lib/utils/common';
import { ArticleModule } from '@modules/article/article.module';
import { ArticleRepository } from '@modules/article/repositories/article.repository';
import { Article, ArticleSchema } from '@modules/article/schemas/article.schema';
import ArticleSearchService from '@modules/article/services/article-search.service';
import { ArticleService } from '@modules/article/services/article.service';
import { SearchModule } from '@modules/elasticsearch/elasticsearch.module';
import { RmqModule } from '@modules/rmq/rmq.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentsController } from './controllers/comment.controller';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentsService } from './services/comment.service';

@Module({
  imports: [
    JwtModule,
    ArticleModule,
    RmqModule.register({
      name: NOTIFICATION
    }),
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])
  ],
  controllers: [CommentsController],
  providers: [
    CommentsService, 
    ArticleService, 
    ArticleRepository
  ]
})
export class CommentsModule { }
